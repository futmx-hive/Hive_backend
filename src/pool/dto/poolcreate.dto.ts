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

class StudentDTO {
	@IsNotEmpty()
	@Matches(/^m\d{7}$/i)
	@IsString()
	@Transform(trim)
	exam_num: string;
	@IsNotEmpty()
	@IsString()
	@Transform(trim)
	first_name: string;
	@IsNotEmpty()
	@IsString()
	@Transform(trim)
	last_name: string;
}

export class SupervisorStudentsDTO {
	@IsNotEmpty()
	@IsMongoId()
	supervisor_id: Types.ObjectId;

	@ValidateNested({ each: true })
	@ArrayMaxSize(200)
	@ArrayMinSize(1)
	@Type(() => StudentDTO)
	@IsArray()
	students: StudentDTO[];
}

export class PoolDTO {
	@IsNotEmpty()
	@IsPositive()
	@Min(2005)
	@IsNumber()
	year: number;

	@IsNotEmpty()
	@IsMongoId()
	creator: Types.ObjectId;
	@ValidateNested({ each: true })
	@ArrayMaxSize(10)
	@ArrayMinSize(1)
	@IsArray()
	@Type(() => SupervisorStudentsDTO)
	assignees: SupervisorStudentsDTO[];
}
