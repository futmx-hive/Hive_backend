import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { connectionTypes } from "../../types/auth_types";

export class SignupDTO {
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string;

	@IsString()
	connection_type: connectionTypes = "passwordless";
}
