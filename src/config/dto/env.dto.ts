import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class EnvVarDTO {
	@IsNumberString()
	PORT: number;
	@IsNotEmpty()
	@IsString()
	CLOUDINARY_API_KEY: string;

	@IsNotEmpty()
	@IsString()
	CLOUDINARY_API_SECRET: string;

	@IsNotEmpty()
	@IsString()
	TYPESENSE_DEV_ADMIN_KEY: string;

	@IsNotEmpty()
	@IsNumberString()
	TYPESENSE_DEV_PORT: string;

	@IsNotEmpty()
	@IsString()
	TYPESENSE_DEV_HOST: string;

	@IsNotEmpty()
	@IsString()
	DB_USERNAME: string;

	@IsNotEmpty()
	@IsString()
	DB_PASSWORD: string;

	@IsNotEmpty()
	@IsString()
	GITHUB_ACCESS_TOKEN: string;
}
