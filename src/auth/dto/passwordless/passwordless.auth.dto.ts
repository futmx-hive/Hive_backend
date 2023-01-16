import { IsNotEmpty, IsString } from "class-validator";
import { connectionTypes } from "../../types/auth_types";

export class PasswordlessAuthDTO {
	@IsNotEmpty()
	@IsString()
	email: string;

	@IsString()
	connection_type: connectionTypes = "passwordless";
}
