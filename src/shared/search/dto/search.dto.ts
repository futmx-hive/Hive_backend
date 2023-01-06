import { IsNumberString, IsString } from "class-validator";

export class ProjectSearchDTO {
	@IsString()
	query: string;

	@IsNumberString()
	from: number;

	@IsNumberString()
	to: number;

	@IsNumberString()
	page: number;

	@IsNumberString()
	page_size: number;
}
