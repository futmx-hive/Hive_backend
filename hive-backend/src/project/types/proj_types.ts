import { docDetailsSuccess } from "src/documents/types";
import { ProjectDTO } from "../dto/proj.dto";
import { ProjectDoc } from "../model/project.entity";

export type application_type = "web" | "mobile" | "none";
export type project_category = "undergraduate" | "masters" | "PHD";

export interface projectService {
	createProject(
		project: ProjectDTO,
		docData: docDetailsSuccess,
	): Promise<ProjectDoc | never>;
}

export type createProjectObject = docDetailsSuccess & {
	source_writeup: string;
	cloned_code_repo_urls?: string[];
};
