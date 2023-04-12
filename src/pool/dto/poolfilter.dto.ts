import { Transform, Type } from "class-transformer";
import { PipeTransform } from "@nestjs/common";
import { IsString, IsNotEmpty, IsNumberString, IsIn } from "class-validator";
import { Types } from "mongoose";
import { trim } from "src/profile/dto/user.update.dto";
import { degreeType } from "../types";
import { degreeTypes } from "src/project/model/project.entity";

export class PoolBasicFilter {
	@IsNotEmpty()
	@IsNumberString()
	year: number;
	@IsNotEmpty()
	@IsIn(degreeTypes)
	@IsString()
	students_type: degreeType;
}
