import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OTPDoc, OTP } from "../model/otp.entity";
import * as crypto from "node:crypto";
import { EmailAuthService } from "./auth.email.service";
import { OtpVerificationnDTO } from "../dto/passwordless/login";

const FIVE_MINS = 60 * 1000 * 5;

@Injectable()
export class OtpService {
	constructor(
		@InjectModel(OTP.name) private readonly OTPColl: Model<OTPDoc>,
		private readonly emailAuthService: EmailAuthService,
	) {}
	private generateOTP() {
		return "123456";
		const digits = "0123456789";
		let OTP = "";
		for (let i = 0; i < 6; i++) {
			OTP += digits[Math.floor(Math.random() * 10)];
		}
		return OTP;
	}

	async verifyOTP({ otp, token, email }: OtpVerificationnDTO) {
		const { OTPHash, emailHash } = this.srambleEmailAndOTP(email, otp);

		const doc = await this.OTPColl.findById(token);
		if (!doc) {
			throw new UnauthorizedException("something went wrong");
		}

		if (doc.grantee === emailHash && doc.code === OTPHash) return true;
		throw new UnauthorizedException("something went wrong");
	}
	private srambleEmailAndOTP(
		email: string,
		OTP: string,
	): { OTPHash: string; emailHash: string } {
		const OTPHash = crypto.createHash("sha256").update(OTP).digest("hex");
		const emailHash = crypto
			.createHmac("sha256", "19n0-")
			.update(email)
			.digest("hex");

		return {
			OTPHash,
			emailHash,
		};
	}

	async CreateAndStoreOTP(OTP: string, email: string) {
		try {
			const { OTPHash, emailHash } = this.srambleEmailAndOTP(email, OTP);
			await this.OTPColl.deleteMany({
				grantee: emailHash,
			});

			const doc = await this.OTPColl.create({
				grantee: emailHash,
				code: OTPHash,
				expires: new Date().getTime() + FIVE_MINS,
			});

			return doc.id.toString();
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async processOTP(email: string) {
		const OTP = this.generateOTP();
		const id = await this.CreateAndStoreOTP(OTP, email);
		await this.emailAuthService.sendOTPtoEmail(OTP, email);
		return id;
	}
}
