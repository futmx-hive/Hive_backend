import {
	BadRequestException,
	Injectable,
	UnprocessableEntityException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, MongooseError } from "mongoose";
import { PasswordlessAuthDTO } from "../dto/passwordless/passwordless.auth.dto";
import { UserDoc, UserEntity } from "../model/user.entity";
import { Roles } from "../types/auth_types";
import { AuthService } from "./auth.service";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserEntity.name) private readonly users: Model<UserDoc>,
		private readonly authService: AuthService,
	) {}

	async createUser<T extends PasswordlessAuthDTO>(
		userData: T,
		isNew = false,
	) {
		const { email, connection_type, ...rest } = userData;
		if (!isNew) {
			const existingUser = await this.authService.findByEmail(email);
			if (existingUser && connection_type !== "passwordless") {
				throw new BadRequestException(
					"user already exists please login",
				);
			}
			if (connection_type === "passwordless" && existingUser) {
				return existingUser;
			}
		}
		try {
			const newUser = await this.users.create({
				email,
				connection_type,
				...rest,
			});
			return newUser;
		} catch (error) {
			if (error instanceof MongooseError) {
				throw new UnprocessableEntityException("invalid details");
			}
		}
	}
	async updateUserDetails(
		updateInitiatorDetails: UserEntity,
		newDetails: Partial<UserEntity>,
	) {
		const existingData = await this.authService.findByEmail(
			updateInitiatorDetails.email,
		);
		const { role: newRole, ...restNew } = newDetails;
		try {
			const { role, email, ...restOld } = updateInitiatorDetails;
			const update: Partial<UserEntity> = {
				role: existingData.role,
				...restNew,
			};

			if (role === Roles.SUPER_ADMIN) {
				update.role = newRole;
			}
			const updated = await this.users.findOneAndUpdate(
				{
					email,
				},
				update,
			);
		} catch (error) {
			console.log(error);
			if (error instanceof MongooseError) {
				throw new BadRequestException(
					"error occured while updating details please try again",
				);
			}
		}
	}
}
