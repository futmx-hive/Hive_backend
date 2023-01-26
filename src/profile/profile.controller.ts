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
import { RolesSetter } from "src/auth/decorators/role.decorator";
import { UserDoc, UserEntity } from "src/auth/model/user.entity";
import { UserService } from "src/auth/services/user.service";
import { Roles } from "src/auth/types/auth_types";
import { successObj } from "src/utils";
import { userUpdateDTO } from "./dto/user.update.dto";
import { ProfileService } from "./profile.service";

@Controller("profile")
@UseGuards(AuthGuard("jwt"))
export class ProfileController {
	constructor(
		private service: ProfileService,
		private userService: UserService,
	) {}

	@Get(":id?")
	async getProfile(@Req() req: RequestWithUserPayload) {
		const { user } = req;

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
}
