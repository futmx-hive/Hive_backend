import {
	IsString,
	IsNotEmpty,
	IsNumber,
	IsArray,
	ValidateNested,
	IsMongoId,
} from "class-validator";
import { Types } from "mongoose";
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

	@IsNotEmpty()
	@IsMongoId()
	assignee: Types.ObjectId;
}
