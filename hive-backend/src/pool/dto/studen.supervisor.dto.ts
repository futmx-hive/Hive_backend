import { Transform, Type } from "class-transformer";
import { PipeTransform } from "@nestjs/common";
import {
	IsString,
	IsNotEmpty,
	IsNumber,
	ArrayMinSize,
	ArrayMaxSize,
	IsMongoId,
	IsArray,
	ValidateNested,
	IsPositive,
	Min,
	Matches,
} from "class-validator";
import { Types } from "mongoose";
import { trim } from "src/profile/dto/user.update.dto";

export class StudentPoolDataDTO {
	@IsNotEmpty()
	@IsMongoId()
	student: Types.ObjectId;
	@IsNotEmpty()
	@IsMongoId()
	pool_year: Types.ObjectId;
	@IsNotEmpty()
	@IsString()
	student_type: string;
}
