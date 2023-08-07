import { PROJECT_UPLOAD_STATES } from "@components/Project/context/ProjectsUploadProvider";
import { clone } from "formconfigs/FormReducer";
import { nanoid } from "nanoid";

const { DocumentProcessor, readFile, readAs } = require("..");

export const fileTypes = {
	all: "all",
	main: "main-article",
	intro: "intro",
};
function extractGithubLinks(text = "") {
	const pattern = /\b(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+(?:\/|\b)/g;
	const chunk = text.match(pattern);

	return chunk || [];
}
async function docsToTextArray(docs) {
	return Promise.all(
		[...docs].map(async (doc) => {
			// doc will either br .docx or .txt
			let res = false;
			try {
				let text = "";
				if (doc.type === "text/plain") {
					text = await readFile(doc, null, readAs.txt);
				} else {
					text = await DocumentProcessor.convertTo(doc, "text");
				}
				res = text;
			} catch (error) {
				// console.log(error);
				res = "";
			}

			return Promise.resolve(res);
		}),
	);
}

export const nestedDocsHandler = {
	async preprocessDocs(docs) {
		const map = new Map();
		const textArray = await docsToTextArray(docs);
		for (let i = 0; i < docs.length; i++) {
			const doc = docs[i];
			if (!textArray[i]) {
				// console.log("ffailed " + doc.name);
				continue;
			}

			if (!/\.(docx|txt|text)?$/.test(doc.name)) continue;

			if (doc?.webkitRelativePath) {
				const [base, studentFolderName, _] = doc.webkitRelativePath.split(/\/|\\/);
				// console.log(studentFolderName);
				let links = [];
				if (textArray[i].length < 200) {
					links = extractGithubLinks(textArray[i]);
				}

				if (typeof studentFolderName === "string") {
					if (map.has(studentFolderName)) {
						const prev = map.get(studentFolderName);

						if (!links.length) {
							prev.push({ doc, text: textArray[i] });
						} else {
							prev.links = Array.isArray(prev?.links) ? prev?.links.concat(links) : links;
						}

						map.set(studentFolderName, prev);
					} else {
						const newEntry = [];
						if (!links.length) {
							newEntry.push({ doc, text: textArray[i] });
						}
						newEntry.links = links;
						map.set(studentFolderName, newEntry);
					}
				}
			}
		}

		console.log(map);

		const result = {
			singles: [],
			multi: [],
		};

		for (const [key, value] of [...map.entries()]) {
			console.log({ value });
			if (value.length === 1) {
				result.singles.push([key, value]);
			} else result.multi.push([key, value]);
		}

		return result;
	},
	async validateMulti(DocsArr) {
		const type = DocumentProcessor.projectTypes.MULTIFILE;
		const results = {
			[type]: [],
		};
		let links = [];
		a: for (let i = 0; i < DocsArr.length; i++) {
			const [key, files] = DocsArr[i];
			const dupFiles = [...files];
			links = links.concat(files.links);
			const item = {
				isvalid: false,
				files: [],
				type: type,
				name: key,
				links: [],
				id: nanoid(),
			};
			let checksHistory = [
				{
					intro: false,
					main: false,
				},
			];
			let checks = {
				intro: false,
				main: false,
			};
			b: for (const file of dupFiles) {
				const { text, doc } = file;

				// console.log("DETECTING_INTRO", doc.name);
				if (!checks.intro && DocumentProcessor.detectIntro(text)) {
					checks.intro = true;
				}

				// console.log("DETECTING_MAIN_ARTICLE", doc.name, text.replace("/n", "").split(" ").length);
				if (
					!checks.main &&
					DocumentProcessor.detectMainArticle(text) &&
					text.replace("/n", "").split(" ").length > 2000
				) {
					checks.main = true;
				}
				if (checks.main && checks.intro) {
					item.files = [
						{
							file: file.doc,
							contains: fileTypes.all,
						},
					];
					checksHistory.push(clone(checks));

					break;
				} else if (checks.main || checks.intro) {
					const t = checks.intro ? fileTypes.intro : fileTypes.main;

					const existing = item.files.some((e) => e.contains === t);

					if (!existing) {
						item.files.push({
							file: file.doc,
							contains: t,
						});
					}

					checksHistory.push(clone(checks));

					checks = {
						intro: false,
						main: false,
					};
				}
			}

			console.log(checksHistory);

			const finalChecks = checksHistory.reduce(
				(
					a = {
						intro: false,
						main: false,
					},
					b,
				) => {
					a.intro = a.intro || b.intro;
					a.main = a.main || b.main;
					return a;
				},
			);

			results[type].push({
				...item,
				isvalid: Object.values(finalChecks).every(Boolean),
			});
		}
		const data = results[type];
		if (data[0]) {
			data[0].links = links;
		}

		return data;
	},
};

export const singleDocsHandler = {
	async validateSingles(DocsArr) {
		const type = DocumentProcessor.projectTypes.SINGLE;
		const results = {
			[type]: [],
		};

		for await (const [key, files] of DocsArr) {
			const item = {
				isvalid: false,
				files: [],
				type: type,
				name: key,
				id: nanoid(),
				links: files.links,
			};

			const file = files[0];

			const text = await file.text;
			if (DocumentProcessor.detectCompleteDoc(text)) {
				let chunk = {
					contains: fileTypes.all,
					file: file.doc,
				};

				item.files.push(chunk);
				item.isvalid = true;
			}

			results[type].push(item);
			// console.log();
		}

		const data = results[type];

		return data;
	},
};
