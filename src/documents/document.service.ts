import { BadRequestException, Injectable } from "@nestjs/common";
import * as mammoth from "mammoth";
import { docDetails, DocumentService, preprocessedDocOutput } from "./types";
import { parse, valid } from "node-html-parser";
import { DefaultExtractor } from "./default-extractor.service";

@Injectable()
export class DocService implements DocumentService {
	constructor(private readonly defaultExtractor: DefaultExtractor) {}
	async extractDocDetails(doc: Express.Multer.File) {
		const { DOM, DOMIsValid, markup } = await this.preProcessDoc(doc);

		if (!DOMIsValid) {
			throw new BadRequestException("document has issues");
		}
		const res: docDetails = await this.defaultExtractor.extract(DOM);
		if (res.response === "error") {
			throw new BadRequestException({
				message:
					"error occured while parsing document please ensure your document uses the right template",
				link: "link to templates",
			});
		}
		return { ...res, markup };
	}

	async preProcessDoc(doc: Express.Multer.File) {
		const result: preprocessedDocOutput = {
			markup: "",
			DOM: null,
			DOMIsValid: false,
		};
		result.markup = (
			await mammoth.convertToHtml(
				{
					buffer: doc.buffer,
				},
				{
					styleMap: ["p>b => h1", "b => b"],
					ignoreEmptyParagraphs: true,
				},
			)
		).value;

		result.DOM = parse(
			result.markup.trim().replace(/<p><b>|<\/?b><\/?p>|<\/?b>|/gi, m => {
				switch (m) {
					case "<p><b>":
						return "<h1>";
					case "</b></p>":
						return "</h1>";
					case "<b>":
						return "";
					case "</b>":
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
