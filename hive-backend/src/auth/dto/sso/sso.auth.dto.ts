import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class GoogleSsoDTO {
	@IsNotEmpty()
	@IsString()
	credential: string;

	@IsString()
	@IsOptional()
	g_csrf_token?: string;
}
