import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { DocService } from "src/documents/document.service";
import { docDetailsSuccess } from "src/documents/types";
import { FirebaseService } from "src/firebase/firebase.service";
import { GithubService } from "src/github/github.service";
import { TypesenseService } from "src/typesense/typesense.service";
import { ProjectDTO } from "./dto/proj.dto";
import { Project, ProjectDoc } from "./model/project.entity";
import { projectService } from "./types/proj_types";

@Injectable()
export class ProjectService implements projectService {
	constructor(
		@InjectModel(Project.name)
		private readonly ProjectModel: Model<ProjectDoc>,
		private readonly FirebaseService: FirebaseService,
		private readonly docService: DocService,
		private readonly GithubService: GithubService,
		private readonly SearchService: TypesenseService,
	) {
		this.ProjectModel.collection.watch().on("change", async change => {
			console.log({ change });
			if (
				change.operationType === "insert" ||
				change.operationType === "update" ||
				change.operationType === "replace"
			) {
				const {
					documentKey: { _id },
				} = change;
				await this.SearchService.index<ProjectDoc>(
					_id as Types.ObjectId,
					change.fullDocument,
					change.operationType,
				);
			}

			if (change.operationType === "delete") {
				const id = change.documentKey._id;
				this.SearchService.unindex(id as Types.ObjectId);
			}
		});
	}

	async createProject(
		project: ProjectDTO,
		docData: docDetailsSuccess & {
			source_writeup: string;
			cloned_code_repo_url?: string;
		},
	) {
		const newDoc = await this.ProjectModel.create({
			title: docData.title,
			category: project.category,
			owner: docData.owner.matric_no,
			description: docData.abstract,
			is_application: project.is_application,
			code_repo_url: project.source || "",
			cloned_code_repo_url: docData.cloned_code_repo_url || "",
			source_writeup: docData.source_writeup || "",
			isApproved: false,
			supervisor: "623d832f436dfd41909fb8ae",
			year: docData.year,
			month: docData.month,
		});
		return newDoc;
	}
	async existingProj(search: object) {
		const existingProj = await this.ProjectModel.findOne(search);

		if (existingProj) {
			throw new BadRequestException(
				"this document already exists please try again",
			);
		}

		return true;
	}
	async processProjectData(file: Express.Multer.File, project: ProjectDTO) {
		const docDetails = await this.docService.extractDocDetails(file);
		const { markup, ...rest } = docDetails;

		// await this.existingProj({
		// 	title: { $regex: new RegExp(docDetails.title), $options: "i" },
		// });

		const fileUploadRes = await this.FirebaseService.uploadProjectFile(
			markup,
			{ ...rest, ...project },
		);
		const { repoName: oldRepoName } =
			this.GithubService.extractRepoOwnerDetails(project.source);
		const newRepoName = this.GithubService.generateRepoName(
			{ projectDetails: project, docDetails },
			oldRepoName,
		);
		const cloneRepoRes = await this.GithubService.cloneRepo(
			project.source,
			newRepoName,
		);
		// console.log({ cloneRepoRes });

		const newProj = await this.createProject(project, {
			...docDetails,
			source_writeup: fileUploadRes.id,
			cloned_code_repo_url: cloneRepoRes.clone_url,
		});
		return newProj;
	}
}
