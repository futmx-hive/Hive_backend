import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { StudentModule } from "src/student/student.module";
import { UtilsService } from "src/utils";
import { AuthController } from "./controllers/auth.controller";
import { BasicRoleController } from "./controllers/basicrole.controller";
import { roleGuard } from "./guards/roles.guard";
import { UserLevelIAM, UserLevelIAMchema } from "./model/commonroles.entity";
import { OTP, OTPSchema } from "./model/otp.entity";
import { UserEntity, UserSchema } from "./model/user.entity";
import { EmailAuthService } from "./services/auth.email.service";
import { GoogleAuthService } from "./services/auth.google.service";
import { AuthService } from "./services/auth.service";
import { OtpService } from "./services/otp.service";
import { BasicRoleService } from "./services/role.service";
import { UserService } from "./services/user.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { keys } from "./utils/getKeys";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: UserEntity.name, schema: UserSchema },
			{ name: OTP.name, schema: OTPSchema },
			{ name: UserLevelIAM.name, schema: UserLevelIAMchema },
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
		StudentModule,
	],
	providers: [
		OtpService,
		UserService,
		EmailAuthService,
		AuthService,
		GoogleAuthService,
		UtilsService,
		JwtStrategy,
		roleGuard,
		BasicRoleService,
	],
	controllers: [AuthController, BasicRoleController],
	exports: [UtilsService, UserService],
})
export class AuthModule {}
