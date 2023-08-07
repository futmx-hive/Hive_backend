import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Req,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Types } from "mongoose";
import { RolesSetter } from "src/auth/decorators/role.decorator";
import { UserDoc, UserEntity } from "src/auth/model/user.entity";
import { UserService } from "src/auth/services/user.service";
import { Roles } from "src/auth/types/auth_types";
import { successObj } from "src/utils";
import { MongoIdPipe } from "src/utils/pipes/parsemongid.pipe";
import { userUpdateDTO } from "./dto/user.update.dto";
import { ProfileService } from "./profile.service";
import { roleGuard } from "src/auth/guards/roles.guard";
@Controller("profile")
@UseGuards(AuthGuard("jwt"), roleGuard)
export class ProfileController {
	constructor(
		private service: ProfileService,
		private userService: UserService,
	) {}

	@Get()
	async getProfile(@Req() req: RequestWithUserPayload) {
		const { user } = req;
		console.log(user);

		return {
			...successObj,
			data: user,
		};
	}

	@Patch()
	// @RolesSetter(Roles.BASIC)
	async updateProfile(
		@Req() req: RequestWithUserPayload,
		@Body() data: userUpdateDTO,
	) {
		const { user } = req;

		const updatedUser = await this.userService.updateUserDetails(
			user,
			data,
		);
		return {
			...successObj,
			data: {
				...updatedUser.toJSON(),
				...data,
			},
		};
	}

	@Patch(":id")
	@RolesSetter(Roles.SUPER_ADMIN)
	async updateAnyUserProfile(
		@Param("id", MongoIdPipe) userId: Types.ObjectId,
		@Req() req: RequestWithUserPayload,
		@Body() data: userUpdateDTO,
	) {
		const user = await this.userService.getUser({ _id: userId });
		const updatedUser = await this.userService.updateUserDetails(
			user,
			data,
		);
		return {
			...successObj,
			data: {
				...updatedUser.toJSON(),
				...data,
			},
		};
	}
}
