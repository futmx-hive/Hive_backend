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

class PoolBasicFilter {
	@IsNotEmpty()
	@IsNumber()
	year: number;
}
