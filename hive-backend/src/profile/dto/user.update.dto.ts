import { Transform, TransformFnParams } from "class-transformer";
import {
	IsIn,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsUrl,
	Max,
	MaxLength,
	Min,
	MinLength,
} from "class-validator";
import { Roles } from "src/auth/types/auth_types";
export const trim = (params: TransformFnParams) => params.value.trim();

export class userUpdateDTO {
	@IsOptional()
	@IsNotEmpty()
	@IsString()
	@Transform(trim)
	first_name?: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	@Transform(trim)
	last_name?: string;

	@IsOptional()
	@IsNotEmpty()
	@IsUrl()
	@Transform(trim)
	picture?: string;

	@IsIn(["lecturer", "student"])
	@IsString()
	@IsOptional()
	@Transform(trim)
	occupation?: string;

	@MaxLength(11)
	@MinLength(8)
	@IsString()
	@IsOptional()
	@Transform(trim)
	phone?: string;

	@Max(Roles.SUPER_ADMIN)
	@Min(Roles.BASIC)
	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	role?: Roles;
}
