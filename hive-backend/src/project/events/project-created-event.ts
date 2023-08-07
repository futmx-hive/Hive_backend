import { Project } from "../model/project.entity";

export class ProjectCreated {
	constructor(
		public readonly project: Project,
		public readonly projectDocxFileID: string,
		public readonly projectDocxHTML: string,
	) {}
}
