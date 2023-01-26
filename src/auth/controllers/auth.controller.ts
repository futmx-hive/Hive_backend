import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { StudentService } from "src/student/student.service";
import { successObj } from "src/utils";
import { OtpVerificationnDTO } from "../dto/passwordless/login";
import { PasswordlessAuthDTO } from "../dto/passwordless/passwordless.auth.dto";
import { GoogleSsoDTO } from "../dto/sso/sso.auth.dto";
import { GoogleAuthService } from "../services/auth.google.service";
import { AuthService } from "../services/auth.service";
import { OtpService } from "../services/otp.service";
import { UserService } from "../services/user.service";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly otpService: OtpService,
		private readonly authService: AuthService,
		private readonly googleAuthService: GoogleAuthService,
		private readonly studentService: StudentService,
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

		await this.studentService.createProjectStudent(existingUser, {
			owner: existingUser.id,
		}),
			await this.userService.updateUserDetails(existingUser, {
				email_verified: true,
			});
		const token = this.authService.SignToken(existingUser);

		return {
			...successObj,
			token,
		};
	}

	@Post("sso/redirect/")
	async createSSOUser(@Body() data: GoogleSsoDTO) {
		const token = await this.googleAuthService.authUser(data);
		return {
			...successObj,
			token,
		};
	}
}
