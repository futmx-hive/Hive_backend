import { client } from "@components/config/api";

export class AuthService {
	static async sendOTP(email) {
		return client.post("auth/passwordless", {
			email,
			connection_type: "passwordless",
		});
	}
	static async signupOTP({ email, otp, token }) {
		return client.post("auth/verifyotp", {
			email,
			otp,
			token,
			connection_type: "passwordless",
		});
	}
	static async loginOTP({ email, otp, token }) {
		return client.post("auth/passwordless-login", {
			email,
			otp,
			token,
			connection_type: "passwordless",
		});
	}
}
