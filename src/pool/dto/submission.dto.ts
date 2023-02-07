import {
	IsString,
	IsNotEmpty,
	IsNumber,
	IsArray,
	ValidateNested,
} from "class-validator";
import { submissionType } from "../model/submissions.entity";

export class SubmissionDTO {
	@IsNotEmpty()
	@IsNumber()
	submission_type: submissionType;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsArray()
	@ValidateNested({ each: true })
	links: string[];
}
