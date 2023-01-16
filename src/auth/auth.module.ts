import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { OTP, OTPSchema } from "./model/otp.entity";
import { UserEntity, UserSchema } from "./model/user.entity";
import { EmailAuthService } from "./services/auth.email.service";
import { AuthService } from "./services/auth.service";
import { OtpService } from "./services/otp.service";
import { UserService } from "./services/user.service";
import { keys } from "./utils/getKeys";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: UserEntity.name, schema: UserSchema },
			{ name: OTP.name, schema: OTPSchema },
		]),
		PassportModule.register({
			defaultStrategy: "jwt",
		}),
		JwtModule.register({
			publicKey: keys.publicKey,
			privateKey: keys.privateKey,
			secret: keys.privateKey,
			signOptions: {
				algorithm: "RS256",
				issuer: "hivec",
				expiresIn: "400h",
			},
		}),
	],
	providers: [OtpService, UserService, EmailAuthService, AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
