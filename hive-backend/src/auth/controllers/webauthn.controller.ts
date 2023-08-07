import { Controller, Get, Post } from "@nestjs/common";

@Controller("auth/webauthn")
export class WebauthnController {
	@Get("registration-options")
	async registerDevice() {}
	@Post("verify-registration")
	async VerifyReg() {}
	@Get("authentication-options")
	async getAuthenticationOptions() {}
	@Post("authenticate")
	async authenticate() {}
}
