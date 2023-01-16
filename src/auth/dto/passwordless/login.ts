import { IsNotEmpty, IsString } from "class-validator";

export class OtpVerificationnDTO {
	@IsNotEmpty()
	@IsString()
	email: string;

	@IsString()
	@IsNotEmpty()
	otp: string;

	@IsString()
	@IsNotEmpty()
	token: string;
}
