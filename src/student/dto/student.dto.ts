import { Transform, TransformFnParams } from "class-transformer";
import { IsOptional, IsString, Matches } from "class-validator";
const trim = (params: TransformFnParams) => params.value.trim();

export class studentDTO {
	@IsString()
	@IsOptional()
	@Matches(/^\d{4}\/\d{1}\/\d{5}[A-Z]{2}$/i)
	@Transform(trim)
	matric_no?: string;
}
