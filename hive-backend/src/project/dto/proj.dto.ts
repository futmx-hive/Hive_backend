import { application_type, project_category } from "../types/proj_types";
import {
	IsString,
	IsNotEmpty,
	ValidateIf,
	IsIn,
	IsOptional,
	IsBooleanString,
} from "class-validator";

export class ProjectDTO {
	@IsNotEmpty()
	@IsBooleanString()
	is_application: boolean;

	@IsIn(["undergraduate", "masters", "PHD"])
	@IsNotEmpty()
	@IsString()
	category: project_category;

	@IsOptional()
	@ValidateIf(obj => obj.is_application)
	source: string;

	@IsOptional()
	file_name: string;
}
