import {
	Controller,
	Post,
	Body,
	UseInterceptors,
	UploadedFile,
	UploadedFiles,
	HttpCode,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ParseDocxPipe } from "src/documents/pipe/parse-docx.pipe";
import { successObj } from "src/utils";
import { ProjectDTO } from "./dto/proj.dto";
import { ProjectService } from "./project.service";
const PROJECT_FILE_NAME = "project_file";

@Controller("project")
export class ProjectController {
	constructor(private readonly ProjService: ProjectService) {}
	@Post()
	@HttpCode(201)
	@UseInterceptors(FileInterceptor(PROJECT_FILE_NAME))
	async createProject(
		@Body() project: ProjectDTO,
		@UploadedFile("file", new ParseDocxPipe()) file: Express.Multer.File,
	) {
		const createdProject = await this.ProjService.processProjectData(
			file,
			project,
		);
		return {
			data: createdProject,
			...successObj,
		};
	}
	@Post("/bulkupload")
	@UseInterceptors(
		FilesInterceptor(PROJECT_FILE_NAME + "s", 100, {
			fileFilter(req, file, callback) {
				try {
					console.log(file.filename);
					new ParseDocxPipe().transform(file as Express.Multer.File);

					return callback(null, true);
				} catch (error) {
					return callback(error as Error, false);
				}
			},
			limits: {
				fileSize: 6000000,
			},
		}),
	)
	async bulkUploadProjects(
		@UploadedFiles() files: Array<Express.Multer.File>,
		@Body("sources") projectConfig: string,
	) {
		const projectConfigArray: ProjectDTO[] = JSON.parse(projectConfig);
		const filesProjectConfigMap: Map<string, ProjectDTO> = new Map(
			projectConfigArray.map((v, i) => [files[i].originalname, v]),
		);
		const newProjects: any[] = [];

		for (const file of files) {
			const project = filesProjectConfigMap.get(file.originalname);
			newProjects.push(
				await this.ProjService.processProjectData(file, project),
			);
		}
		return {
			data: newProjects,
			...successObj,
		};
	}
}
