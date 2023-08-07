import { IsString, IsNotEmpty, IsNumber, IsMongoId } from "class-validator";
import { Types } from "mongoose";
import { submissionType } from "../model/submissions.entity";

export class SubmissionDTO {
	@IsNotEmpty()
	@IsNumber()
	submission_type: submissionType;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsNotEmpty()
	@IsString({ each: true })
	links: string[];

	@IsNotEmpty()
	@IsMongoId()
	pool_id: Types.ObjectId;

	@IsNotEmpty()
	@IsMongoId()
	student_id: Types.ObjectId;
}
