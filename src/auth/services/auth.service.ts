import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, MongooseError } from "mongoose";
import { UserDoc, UserEntity } from "../model/user.entity";
import { TokenPayload } from "../types/auth_types";

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserEntity.name) private users: Model<UserDoc>,
		private readonly jwtService: JwtService,
	) {}

	async findByEmail(email: string, verified = false) {
		try {
			const query: FilterQuery<UserDoc> = {
				email,
			};
			if (verified) {
				query.email_verified = verified;
			}
			const user = await this.users.findOne(query);

			return user;
		} catch (error) {
			console.log(error);
			if (error instanceof MongooseError) {
				throw new BadRequestException(error.message);
			}
		}
	}

	SignToken(data: TokenPayload): string {
		const token = this.jwtService.sign(data);
		return token;
	}
}
