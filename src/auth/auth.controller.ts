import {
	BadRequestException,
	Body,
	Controller,
	Param,
	Post,
	Req,
} from "@nestjs/common";
import { Request } from "express";
import { successObj } from "src/utils";
import { OtpVerificationnDTO } from "./dto/passwordless/login";
import { PasswordlessAuthDTO } from "./dto/passwordless/passwordless.auth.dto";
import { AuthService } from "./services/auth.service";
import { OtpService } from "./services/otp.service";
import { UserService } from "./services/user.service";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly otpService: OtpService,
		private readonly authService: AuthService,
	) {}
	@Post("passwordless")
	async createPasswordlessUser(@Body() data: PasswordlessAuthDTO) {
		if (data.connection_type !== "passwordless")
			throw new BadRequestException("ivalid data");

		await this.userService.createUser(data);
		const token = await this.otpService.processOTP(data.email);
		return {
			...successObj,
			token,
			message: "OTP sent successfully",
		};
	}

	@Post("/verifyotp")
	async LoginPasswordlessUser(@Body() data: OtpVerificationnDTO) {
		await this.otpService.verifyOTP(data);

		const existingUser = await this.authService.findByEmail(
			data.email,
			false,
		);
		await this.userService.updateUserDetails(existingUser, {
			email_verified: true,
		});
		const token = this.authService.SignToken({
			sub: existingUser._id,
			email: existingUser.email,
			nonce: "90000iuixkw",
		});

		return {
			...successObj,
			token,
		};
	}

	@Post("sso/redirect/")
	async createSSOUser(@Body() cat: any, @Req() req: Request) {
		console.log(cat, req.cookies);
	}
}
