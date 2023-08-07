import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { DocService } from "src/documents/document.service";
import { docDetailsSuccess } from "src/documents/types";
import { ImageGenerator } from "src/image-generators/dream-studio/services/image-generator.service";
import { FirebaseFilesGuardianService } from "src/firebase/filesguardian.service";
import { FirebaseService } from "src/firebase/firebase.service";
import { GithubService } from "src/github/github.service";
import { TypesenseService } from "src/typesense/typesense.service";
import { ProjectDTO } from "./dto/proj.dto";
import { Project, ProjectDoc } from "./model/project.entity";
import { createProjectObject, projectService } from "./types/proj_types";
import { LeapImageGenerator } from "src/image-generators/lisp/services/leap-image-generator.service";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { ProjectCreated } from "./events/project-created-event";

const PROJECT_EVENTS = {
	CREATED: "C",
};

@Injectable()
export class ProjectService implements projectService {
	constructor(
		@InjectModel(Project.name)
		private readonly ProjectModel: Model<ProjectDoc>,
		private readonly FirebaseService: FirebaseService,
		private readonly docService: DocService,
		private readonly GithubService: GithubService,
		private readonly SearchService: TypesenseService,
		private readonly fileGuardian: FirebaseFilesGuardianService,
		private readonly imageGen: LeapImageGenerator,
		private eventEmitter: EventEmitter2,
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

	async getProject(q: FilterQuery<ProjectDoc>) {
		try {
			const project = await this.ProjectModel.findOne(q);
			if (!project) {
				throw new BadRequestException("failed to get project");
			}
			return project;
		} catch (error) {
			throw error;
		}
	}

	async createProject(
		project: ProjectDTO,
		docData: createProjectObject &
			Pick<ProjectDoc, "topic_img_url" | "owner_fullname">,
	) {
		const newDoc = await this.ProjectModel.create({
			title: docData.title,
			category: project.category,
			class: project.category,
			owner: docData.owner.matric_no,
			description: docData.abstract,
			is_application: project.is_application,
			code_repo_url: project.source || "",
			cloned_code_repo_urls: docData.cloned_code_repo_urls || [],
			source_writeup: docData.source_writeup || "",
			isApproved: false,
			supervisor: docData.supervisor,
			year: docData.year,
			month: docData.month,
			topic_img_url: docData.topic_img_url,
			owner_fullname: docData.owner_fullname,
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

		await this.existingProj({
			title: { $regex: new RegExp(docDetails.title), $options: "i" },
		});
		const id = this.FirebaseService.generateFileId(docDetails.title);

		let newProject: createProjectObject = {
			...docDetails,
			source_writeup: id,
		};
		if (project.is_application && project.source) {
			const repoURLs: string[] = [];
			for (const source of project.source.split(",")) {
				const { repoName: oldRepoName } =
					this.GithubService.extractRepoOwnerDetails(source);
				const newRepoName = this.GithubService.generateRepoName(
					{ projectDetails: project, docDetails },
					oldRepoName,
				);
				const cloneRepoRes = await this.GithubService.cloneRepo(
					source,
					newRepoName,
				);
				repoURLs.push(cloneRepoRes.clone_url);
			}
			newProject = {
				...newProject,
				cloned_code_repo_urls: repoURLs,
			};
		}
		let url = "";

		url = await this.generateProjectImage(docDetails.title);
		console.log(url);
		const newProj = await this.createProject(
			{
				...project,
				category: project.category,
			},
			{
				...newProject,
				topic_img_url: url || "",
				owner_fullname: docDetails.owner.name,
				supervisor: docDetails.supervisor || "",
			},
		);

		this.eventEmitter.emitAsync(
			PROJECT_EVENTS.CREATED,
			new ProjectCreated(newProj, id, markup),
		);
		return newProj;
	}

	async getProjectFileURL(projectId: string) {
		const project = await this.getProject({ _id: projectId });
		const URL = await this.fileGuardian.getSignedFileURL(project);
		return URL;
	}

	async generateProjectImage(prompt: string) {
		return this.imageGen.generateImage(prompt);
	}

	@OnEvent(PROJECT_EVENTS.CREATED, {
		promisify: true,
		async: true,
	})
	async handleOrderCreatedEvent(payload: ProjectCreated) {
		await this.FirebaseService.uploadProjectFile(
			payload.projectDocxFileID,
			payload.projectDocxHTML,
			payload.project,
		);
	}
}
