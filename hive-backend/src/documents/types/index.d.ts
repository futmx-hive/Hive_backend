import { HTMLElement, Node } from "node-html-parser";
import { ProjectDTO } from "src/project/dto/proj.dto";
export type DocOwner = {
	name: string;
	matric_no: string;
};
export type docDetailsSuccess = {
	response: "success";
	title: string;
	abstract: string;
	owner: DocOwner;
	year: number;
	month: string;
	supervisor?: string;
};
type docDetailsError = {
	response: "error";
	message: string;
};
export type preprocessedDocOutput = {
	markup: string;
	DOM: HTMLElement;
	DOMIsValid: boolean;
	text: string;
};
export type fullProject = {
	projectDetails: ProjectDTO;
	docDetails: docDetailsSuccess;
};

export type docDetails = docDetailsError | docDetailsSuccess;
export interface DocumentService {
	extractDocDetails(doc: Express.Multer.File): Promise<any>;
	preProcessDoc(doc: Express.Multer.File): Promise<preprocessedDocOutput>;
}

export interface ExtractorTemplate {
	title(node: HTMLElement, data: docDetailsSuccess): boolean;
	owner(node: HTMLElement, data: docDetailsSuccess): boolean;
	date(node: HTMLElement, data: docDetailsSuccess): boolean;
	supervisor(
		node: HTMLElement,
		data: docDetailsSuccess,
		visitedNodes: Node[],
	): boolean;
	abstract(
		node: HTMLElement,
		data: docDetailsSuccess,
		DOM: HTMLElement,
	): boolean;
	extract(DOM: HTMLElement): Promise<docDetails | any>;
}
