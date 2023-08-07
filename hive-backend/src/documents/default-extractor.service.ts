import { Injectable } from "@nestjs/common";
import { ExtractorTemplate, docDetailsSuccess, docDetails } from "./types";
import { HTMLElement, Node } from "node-html-parser";
import { validateDocDetails } from "./validators/document-validator.pipe";
import { matchedDate } from "./utils";
import { writeFile } from "fs/promises";
@Injectable()
export class DefaultExtractor {
	private readonly count: number = 5;
	date(node: HTMLElement, data: docDetailsSuccess) {
		console.log(node.textContent);
		console.log("//==>LOOKING $ DAAATTEE");
		const res = matchedDate(node.textContent.trim());

		if (res.matched) {
			data.year = Number(res.data[2]);
			data.month = res.data[1].toLowerCase();
			return true;
		}
		return false;
	}
	title(
		node: HTMLElement,
		data: docDetailsSuccess,
		index: number,
		visitedNodes: Node[],
		allNodes: HTMLElement[],
	): string {
		if (node.innerText.toLowerCase().trim() === "by") {
			let i = 0;

			while (visitedNodes[i] && index < 20) {
				if (visitedNodes[i]?.innerText.trim().length > 20) {
					return visitedNodes[i]?.innerText;
				}
				i++;
			}

			return "";
		}
		return "";
	}
	owner(
		node: HTMLElement,
		data: docDetailsSuccess,
		index: number,
		visitedNodes: Node[],
		allNodes: HTMLElement[],
	): boolean {
		if (node.textContent.toLowerCase().trim() === "by") {
			let i = index + 1;
			while (/\d/.test(allNodes[i].innerText) || i < 5) {
				i++;
				const Node2 = allNodes[i];
				const Node1 = allNodes[i - 1];
				const name = Node1.textContent.toLowerCase();
				const matric_no = Node2.textContent.toLowerCase();

				data.owner.matric_no = matric_no;
				data.owner.name = name;
				if (name && matric_no) {
					return true;
				}
			}
		}
		return false;
	}
	supervisor(
		node: HTMLElement,
		data: docDetailsSuccess,
		visitedNodes: Node[],
		allNodes: HTMLElement[],
	): string {
		if (/project\s+supervisor?/gi.test(node.textContent.trim())) {
			let i = 0;
			const start = visitedNodes.length + 1;
			const end = start + 5;
			const nodes = [
				...visitedNodes.slice(-3),
				...allNodes.splice(start, end).map(e => e.clone()),
			];
			while (nodes[i]) {
				const nodeToCheck = nodes[i];

				if (
					/^(\s|\t)*(mr|dr|mrs|mallam|prof).{5,50}/gi.test(
						nodeToCheck.innerText.trim(),
					)
				) {
					console.log(nodeToCheck.innerText.replace(/\t.+/, ""));
					console.log("YAAAY==> FOUND SUPERVISOR");

					return nodeToCheck.innerText.trim().replace(/\t|[\_]/g, "");
				}

				i++;
			}
		}
		return "";
	}
	abstract(
		node: HTMLElement,
		data: docDetailsSuccess,
		index: number,
		nodes: HTMLElement[],
	): boolean {
		// console.log(node.innerText);
		// console.log("//==================");
		if (/abstract\.?/gi.test(node.innerText.trim())) {
			let startIndex = index;
			let initialNode = nodes[startIndex];
			const nodeTagName = nodes[startIndex + 1].tagName;
			let prevNode: Node = null;
			let abstract = "";

			do {
				prevNode = initialNode.clone();
				abstract += " " + prevNode.innerText;
				startIndex++;
				initialNode = nodes[startIndex];
			} while (
				nodes[startIndex] &&
				nodes[startIndex].tagName === nodeTagName &&
				!/table of contents?/gi.test(prevNode.textContent)
			);
			data.abstract = abstract;

			return true;
		}
		return false;
	}
	cleanTitle(data: docDetailsSuccess) {
		const { title } = data;
		const nameReg = new RegExp(data.owner.name.trim().split(" ")[0], "ig");
		const res = nameReg.exec(title);
		if (res && res.index) {
			data.title = title.slice(0, res.index);
		}
	}
	async extract(
		DOM: HTMLElement,
		DomText: string,
	): Promise<docDetails | any> {
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
			supervisor: "",
		};
		let ignoreAll = false;
		// await writeFile("a.txt", DomText);

		const execRes =
			/abstract([\w\s\W\t\n]*)table\s+of([\s\n\t]{1,})contents?/gi.exec(
				DomText,
			);
		if (Array.isArray(execRes)) {
			docData.abstract = execRes[1]
				.replace(/[\t\n]/g, "")
				.replace(/table of contents?.*/gi, "");
		}
		const nodes: HTMLElement[] = DOM.querySelectorAll("*").filter(e => {
			if (/Chapter\s+two/gi.test(e.textContent)) {
				ignoreAll = true;
			}
			if (ignoreAll) {
				return false;
			}
			return e.textContent.trim();
		});
		// console.log(nodes.length);
		let i = 0;
		const visitedNodes: Node[] = [];
		for (const node of nodes) {
			const res = validateDocDetails(docData);
			if (!res.length) {
				this.cleanTitle(docData);
				return docData;
			}

			this.date(node, docData);
			if (!docData.title) {
				docData.title = this.title(
					node,
					docData,
					i,
					visitedNodes,
					nodes,
				);
			}

			!docData.abstract && this.abstract(node, docData, i, nodes);
			(!docData.owner.name || !docData.owner.matric_no) &&
				this.owner(node, docData, i, visitedNodes, nodes);
			if (!docData.supervisor) {
				docData.supervisor = this.supervisor(
					node,
					docData,
					visitedNodes,
					nodes,
				);
				// console.log("AFTERRR");
				// console.log(docData.supervisor);
			}

			visitedNodes.push(node.clone());
			i++;
		}
		const res = validateDocDetails(docData);
		console.log(res);
		if (!res.length) {
			this.cleanTitle(docData);
			return docData;
		}
		return {
			response: "error",
			message: "oopsie sth went terrribly wrong",
		};
	}
}
