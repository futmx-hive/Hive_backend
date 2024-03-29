import { Model, Types } from "mongoose";
import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { UserDoc, UserEntity } from "../model/user.entity";
import { Roles } from "../types/auth_types";
import { InjectModel } from "@nestjs/mongoose";
import { UserLevelIAM } from "../model/commonroles.entity";
import { RoleGrantDTO } from "../dto/rolegrant.dto";
const rolesArr = [Roles.STUDENT, Roles.SUPER_ADMIN, Roles.SUPERVISOR];

@Injectable()
export class BasicRoleService {
	constructor(
		@InjectModel(UserEntity.name) private users: Model<UserDoc>,
		@InjectModel(UserLevelIAM.name) private basicRoles: Model<UserLevelIAM>,
	) {}
	async grant(user: UserDoc, { grantee, role: newRole }: RoleGrantDTO) {
		if (!rolesArr.some(role => role === newRole))
			throw new BadRequestException("invalid role");

		// const session = await mongoose.startSession();
		try {
			// await session.startTransaction();
			let x = await this.users.findByIdAndUpdate(
				grantee,
				{ role: newRole },
				// {
				// 	session,
				// },
			);
			if (!x._id) {
				throw new InternalServerErrorException();
			}
			const key = this.resolveRoleKey(newRole);

			const rolesChunk = await this.basicRoles.findOne(
				{ id: "643dce4c1ed1a21de532072e" },

				// { session },
			);

			if (!rolesChunk[key].find(e => e.toString() !== grantee)) {
				rolesChunk[key].push(new Types.ObjectId(grantee));
				await rolesChunk.save();
			}

			// await session.commitTransaction();
			// await session.endSession();
			return true;
		} catch (error) {
			console.log(error);
			// await session.abortTransaction();
			// await session.endSession();
			throw new InternalServerErrorException(
				"error occured while updating user role",
			);
		}
	}
	async getUsersWithRole(role: Roles) {
		const key = this.resolveRoleKey(role);
		console.log({ key });
		try {
			const users = await this.basicRoles
				.findOne()
				.populate(key, "-createdAt -updatedAt -connection_type")
				.select(key)
				.exec();
			return users;
		} catch (error) {
			console.log(error);
			throw new InternalServerErrorException("an error occured");
		}
	}
	private resolveRoleKey(role: Roles) {
		type accessiblesMap = {
			readonly 10: "super_admins";
			readonly 4: "supervisors";
		};
		const map: accessiblesMap = {
			[Roles.SUPER_ADMIN]: "super_admins",
			[Roles.SUPERVISOR]: "supervisors",
		};
		if (!(role.toString() in map))
			throw new BadRequestException("unable to resolve role");

		return map[role as keyof accessiblesMap];
	}
}
