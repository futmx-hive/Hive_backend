import { application_type, project_category } from "../types/proj_types";
import {
	IsString,
	IsNotEmpty,
	ValidateIf,
	IsIn,
	IsUrl,
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

	@ValidateIf(obj => obj.is_application)
	@IsNotEmpty()
	@IsUrl()
	source: string;

	@IsOptional()
	file_name: string;
}
