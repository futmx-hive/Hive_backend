import { BadRequestException, Injectable } from "@nestjs/common";
import * as mammoth from "mammoth";
import { docDetails, DocumentService, preprocessedDocOutput } from "./types";
import { parse, valid } from "node-html-parser";
import { DefaultExtractor } from "./default-extractor.service";

@Injectable()
export class DocService implements DocumentService {
	constructor(private readonly defaultExtractor: DefaultExtractor) {}
	async extractDocDetails(doc: Express.Multer.File) {
		const { DOM, DOMIsValid, markup, text } = await this.preProcessDoc(doc);
		const err = new BadRequestException({
			message:
				"error occured while parsing document please ensure your document uses the right template",
			link: "link to templates",
		});
		if (!DOMIsValid) {
			throw new BadRequestException("document has issues");
		}
		let res: docDetails;
		try {
			res = await this.defaultExtractor.extract(DOM, text);
		} catch (error) {
			console.log({ error });
			throw err;
		}
		if (res.response === "error") {
			throw err;
		}
		console.log(res);
		return { ...res, markup };
	}

	async preProcessDoc(doc: Express.Multer.File) {
		const result: preprocessedDocOutput = {
			markup: "",
			DOM: null,
			DOMIsValid: false,
			text: "",
		};
		result.markup = (
			await mammoth.convertToHtml(
				{
					buffer: doc.buffer,
				},
				{
					styleMap: ["p>b => h1", "b => b", "b>p => h1"],
					ignoreEmptyParagraphs: true,
					includeDefaultStyleMap: true,
					includeEmbeddedStyleMap: true,
				},
			)
		).value;
		result.text = (
			await mammoth.extractRawText({
				buffer: doc.buffer,
			})
		).value;

		result.DOM = parse(
			result.markup
				.trim()
				.replace(/<p><b>|<\/?b><\/?p>|<\/?b>|<br\/>/gi, m => {
					switch (m) {
						case "<p><b>":
							return "<h1>";
						case "</b></p>":
							return "</h1>";
						case "<b>":
							return "";
						case "</b>":
							return "";
						case "<br>":
							return "";
						default:
							return "";
					}
				}),
		);

		result.DOMIsValid = valid(result.markup.trim().toLowerCase(), {
			fixNestedATags: true,
		});

		return result;
	}
}
