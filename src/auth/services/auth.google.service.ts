import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { GoogleSsoDTO } from "../dto/sso/sso.auth.dto";
import { UserEntity, UserSchema } from "../model/user.entity";
import { Roles } from "../types/auth_types";
import { UtilsService } from "src/utils";
import * as jose from "jose";
import axios from "axios";

@Injectable()
export class GoogleAuthService {
	client: OAuth2Client;
	constructor(
		private readonly configService: ConfigService,
		private readonly authservice: AuthService,
		private readonly userService: UserService,
		private readonly utilsService: UtilsService,
	) {
		this.client = new OAuth2Client(
			this.configService.getOrThrow<string>("OAUTH2_CLIENT_ID_1"),
		);
	}

	private async verifyIdToken(idToken: string) {
		const ticket = await this.client.verifyIdToken({
			idToken: idToken,
			audience:
				this.configService.getOrThrow<string>("OAUTH2_CLIENT_ID_1"),
		});
		const payload: TokenPayload = ticket.getPayload();

		return payload;
	}
	private async verifyIdTokenManual(idToken: string) {
		const keys = (
			await axios<{ keys: jose.JWK[] }>(
				"https://www.googleapis.com/oauth2/v3/certs",
			)
		).data;

		for (const item of keys.keys) {
			const key = await jose.importJWK(item);
			console.log(key);
			try {
				const decoded: jose.JWTVerifyResult = await jose.jwtVerify(
					idToken,
					key,
					{
						issuer: [
							"https://accounts.google.com",
							"accounts.google.com",
						],
					},
				);
				return decoded.payload as TokenPayload;
			} catch (error) {
				console.log(error);
			}
		}
	}

	async authUser(data: GoogleSsoDTO): Promise<string | never> {
		try {
			const profile: TokenPayload = await this.verifyIdToken(
				data.credential,
			);
			const existingUser = await this.authservice.findByEmail(
				profile.email,
			);
			if (existingUser) {
				return this.authservice.SignToken(existingUser);
			}
			const newUserData: UserEntity = {
				connection_type: "sso-google",
				role: Roles.STUDENT,
				email: profile.email,
				email_verified: profile.email_verified,
				picture:
					profile.picture ||
					this.utilsService.getRandomProfilePic(
						profile.given_name + profile.family_name + profile.sub,
					),
				first_name: profile.given_name,
				phone_verified: false,
				last_name: profile.family_name,
			};

			const newUser = await this.userService.createUser<UserEntity>(
				newUserData,
				true,
			);
			const token = this.authservice.SignToken(newUser);
			return token;
		} catch (error) {
			console.log(error);
			throw new UnauthorizedException();
		}
	}
}
