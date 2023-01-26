import { IsMongoId, IsNotEmpty, IsNumber } from "class-validator";
import { Roles } from "../types/auth_types";
export class RoleGrantDTO {
	@IsNotEmpty()
	@IsMongoId()
	grantee: string;

	@IsNumber()
	@IsNotEmpty()
	role?: Roles;
}
