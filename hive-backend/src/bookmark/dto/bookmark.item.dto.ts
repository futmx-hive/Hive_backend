import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { Types } from "mongoose";

export class BookmarkItemDTO {
	@IsNotEmpty()
	@IsString()
	project_id: Types.ObjectId;

	@IsString()
	@IsNotEmpty()
	project_title: string;

	@IsString()
	@IsOptional()
	category: string;
}
