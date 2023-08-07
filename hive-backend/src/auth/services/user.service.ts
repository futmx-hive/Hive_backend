import {
	BadRequestException,
	Injectable,
	UnprocessableEntityException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, MongooseError } from "mongoose";
import { StudentService } from "src/student/student.service";
import { UtilsService } from "src/utils";
import { PasswordlessAuthDTO } from "../dto/passwordless/passwordless.auth.dto";
import { UserDoc, UserEntity } from "../model/user.entity";
import { Roles } from "../types/auth_types";
import { AuthService } from "./auth.service";
import { Types } from "mongoose";

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserEntity.name) private readonly users: Model<UserDoc>,
		private readonly authService: AuthService,
		private readonly utilService: UtilsService,
		private readonly studentService: StudentService,
	) {}

	async getUser(q: FilterQuery<UserEntity>) {
		try {
			const user = (await this.users.find(q))[0];
			if (!user) throw new BadRequestException("error occured ");
			return user;
		} catch (error) {
			throw new BadRequestException("error occured ");
		}
	}

	async createUser<T extends PasswordlessAuthDTO>(
		userData: T,
		isNew = false,
	) {
		const { email, connection_type, ...rest } = userData;
		const existingUser = await this.authService.findByEmail(email);
		if (!isNew) {
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
			const examNum = this.utilService.extractExamNumFromEmail(email);
			const role = examNum ? Roles.STUDENT : Roles.BASIC;
			let id = new Types.ObjectId();
			let idChanged = false;

			if (role === Roles.STUDENT) {
				const existingStudent =
					await this.studentService.existingStudent({
						exam_num: examNum.toUpperCase(),
					});
				if (existingStudent?._id) {
					id = existingStudent?.owner;
					idChanged = true;
				}
			}

			const newUser = await this.users.create({
				_id: id,
				email,
				connection_type,
				role,
				...rest,
			});

			if (
				!idChanged &&
				role === Roles.STUDENT &&
				newUser.email_verified
			) {
				this.studentService.createProjectStudent(newUser, {
					exam_num: examNum.toUpperCase(),
					owner: newUser.id,
				});
			}

			return newUser;
		} catch (error) {
			console.log(error);
			if (error instanceof MongooseError) {
				throw new UnprocessableEntityException("invalid details");
			}
		}
	}
	async updateUserDetails(
		updateInitiatorDetails: UserEntity,
		newDetails: Partial<UserEntity>,
	) {
		const { ...restNew } = newDetails;
		try {
			const { role, email } = updateInitiatorDetails;
			const update: Partial<UserEntity> = {
				...restNew,
			};

			const updated = await this.users.findOneAndUpdate(
				{
					email,
				},
				update,
			);

			return updated;
		} catch (error) {
			console.log(error);
			if (error instanceof MongooseError) {
				throw new BadRequestException(
					"error occured while updating details please try again",
				);
			} else throw error;
		}
	}
}
// ("aaron.m1602073@st.futminna.edu.ng");
