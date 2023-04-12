import { Injectable } from "@nestjs/common";
import { ExtractorTemplate, docDetailsSuccess, docDetails } from "./types";
import { HTMLElement, Node } from "node-html-parser";
import { validateDocDetails } from "./validators/document-validator.pipe";
import { matchedDate } from "./utils";
@Injectable()
export class DefaultExtractor implements ExtractorTemplate {
	private readonly count: number = 5;
	date(node: HTMLElement, data: docDetailsSuccess) {
		const res = matchedDate(node.textContent.trim());

		if (res.matched) {
			data.year = Number(res.data[2]);
			data.month = res.data[1].toLowerCase();
			return true;
		}
		return false;
	}
	title(node: HTMLElement, data: docDetailsSuccess): boolean {
		if (node.textContent.toLowerCase() === "by") {
			data.title = node.previousElementSibling.textContent;
			// console.log(data.title);
			return true;
		}
		return false;
	}
	owner(node: HTMLElement, data: docDetailsSuccess): boolean {
		if (node.textContent.toLowerCase() === "by") {
			const Node1 = node.nextElementSibling;
			const Node2 = Node1.nextElementSibling;
			const name = Node1.textContent.toLowerCase();
			const matric_no = Node2.textContent.toLowerCase();

			// since they can be swapped
			// console.log({ matric_no, name });

			if (/\d/.test(name)) {
				data.owner.matric_no = name;
				data.owner.name = matric_no;
			} else {
				data.owner = { matric_no, name };
			}
			return true;
		}
		return false;
	}
	abstract(
		node: HTMLElement,
		data: docDetailsSuccess,
		DOM: HTMLElement,
	): boolean {
		DOM.getElementsByTagName("p").find(e => e.parentNode === node);
		if (/abstract/.test(node.textContent.trim().toLowerCase())) {
			const paragraphs = DOM.querySelectorAll("*");
			const startIndex = paragraphs.findIndex(
				e => e.previousSibling === node,
			);
			let PNode = paragraphs[startIndex];
			let prevNodeTagName = "";
			let prevNode: Node = null;
			let abstract = "";
			do {
				prevNodeTagName = PNode.tagName;
				prevNode = PNode.clone();
				PNode = PNode.nextElementSibling;
				abstract += " " + prevNode.textContent;
			} while (
				PNode.previousSibling.textContent === prevNode.textContent &&
				PNode.tagName === prevNodeTagName
			);
			data.abstract = abstract;

			return true;
		}
		return false;
	}
	async extract(DOM: HTMLElement): Promise<docDetails | any> {
		const docData: docDetailsSuccess = {
			owner: {
				matric_no: "",
				name: "",
			},
			abstract: "",
			response: "success",
			title: "",
			year: new Date().getFullYear(),
			month: "",
		};

		const nodes: HTMLElement[] = DOM.getElementsByTagName("h1");

		for (const node of nodes) {
			const res = validateDocDetails(docData);
			if (!res.length) {
				return docData;
			}
			this.date(node, docData);
			!docData.title && this.title(node, docData);
			!docData.abstract && this.abstract(node, docData, DOM);
			(!docData.owner.name || !docData.owner.matric_no) &&
				this.owner(node, docData);
		}
		console.log(docData);
		return {
			response: "error",
			message: "oopsie sth went terrribly wrong",
		};
	}
}
