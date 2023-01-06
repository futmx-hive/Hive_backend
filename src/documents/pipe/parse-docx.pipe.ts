import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class ParseDocxPipe
	implements PipeTransform<Express.Multer.File, Express.Multer.File | never>
{
	private readonly formats: string[] = [
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	];
	transform(file: Express.Multer.File): Express.Multer.File | never {
		if (this.formats.some(e => e === file.mimetype)) {
			return file;
		}
		throw new BadRequestException(
			"invalid file please submit a valid .doc or .docx",
		);
	}
}
