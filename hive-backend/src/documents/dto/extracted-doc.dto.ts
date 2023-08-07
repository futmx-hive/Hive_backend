import { Type } from "class-transformer";
import {
	IsDefined,
	IsNotEmpty,
	IsNumber,
	IsString,
	ValidateNested,
} from "class-validator";
import { docDetailsSuccess, DocOwner } from "../types";

export class DocOwnerDTO implements DocOwner {
	@IsString()
	@IsNotEmpty()
	matric_no: string;

	@IsString()
	@IsNotEmpty()
	name: string;
}

export class DocDetailsDTO implements docDetailsSuccess {
	@IsNotEmpty()
	@IsString()
	title: string;
	@IsNotEmpty()
	@IsString()
	abstract: string;
	@IsDefined()
	@ValidateNested()
	@Type(() => DocOwnerDTO)
	owner: DocOwnerDTO;

	response: "success";
	@IsNumber()
	year: number;

	@IsNotEmpty()
	@IsString()
	month: string;

	@IsNotEmpty()
	@IsString()
	supervisor: string;
}
