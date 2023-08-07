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
	TYPESENSE_PROD_ADMIN_KEY: string;

	@IsNotEmpty()
	@IsNumberString()
	TYPESENSE_PROD_PORT: string;

	@IsNotEmpty()
	@IsString()
	TYPESENSE_DEV_HOST: string;

	@IsNotEmpty()
	@IsString()
	TYPESENSE_PROD_HOST: string;

	@IsNotEmpty()
	@IsString()
	DB_USERNAME: string;

	@IsNotEmpty()
	@IsString()
	DB_PASSWORD: string;

	@IsNotEmpty()
	@IsString()
	GITHUB_ACCESS_TOKEN: string;

	@IsNotEmpty()
	@IsString()
	EMAIL_SERVICE_PUBLIC_KEY: string;

	@IsNotEmpty()
	@IsString()
	EMAIL_SERVICE_PRIVATE_KEY: string;

	@IsNotEmpty()
	@IsString()
	GMAIL_SERVICE_ID: string;

	@IsNotEmpty()
	@IsString()
	OAUTH2_CLIENT_ID_1: string;

	@IsNotEmpty()
	@IsString()
	OAUTH2_CLIENT_SECRET_1: string;

	@IsNotEmpty()
	@IsString()
	DREAM_STUDIO_API_KEY: string;

	@IsNotEmpty()
	@IsString()
	LISP_API_KEY: string;
}
