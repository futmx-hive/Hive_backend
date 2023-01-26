import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ConfigService } from "@nestjs/config";
import axios from "axios";

const EMAIL_TEMPLATE_NAMES = {
	OTP_TEMPLATE: "template_0t4qb2k",
};

@Injectable()
export class EmailAuthService {
	constructor(
		private readonly Authservice: AuthService,
		private readonly configService: ConfigService,
	) {}
	async sendOTPtoEmail(OTP: string, email: string): Promise<boolean | never> {
		try {
			return true;
			await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
				service_id: this.configService.getOrThrow("GMAIL_SERVICE_ID"),
				template_id: EMAIL_TEMPLATE_NAMES.OTP_TEMPLATE,
				template_params: {
					otp: OTP,
					recipient: email,
				},
				accessToken: this.configService.getOrThrow<string>(
					"EMAIL_SERVICE_PRIVATE_KEY",
				),
				user_id: this.configService.getOrThrow<string>(
					"EMAIL_SERVICE_PUBLIC_KEY",
				),
			});

			return true;
		} catch (error) {
			throw new InternalServerErrorException(
				"error occured please try again",
			);
		}
	}
}
