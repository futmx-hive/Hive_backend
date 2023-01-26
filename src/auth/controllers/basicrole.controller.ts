import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Req,
	UseGuards,
} from "@nestjs/common";
import { Roles } from "../types/auth_types";
import { BasicRoleService } from "../services/role.service";
import { successObj } from "src/utils";
import { RolesSetter } from "../decorators/role.decorator";
import { AuthGuard } from "@nestjs/passport";
import { roleGuard } from "../guards/roles.guard";
import { RoleGrantDTO } from "../dto/rolegrant.dto";

@Controller("role")
@RolesSetter(Roles.SUPER_ADMIN)
@UseGuards(AuthGuard("jwt"), roleGuard)
export class BasicRoleController {
	constructor(private readonly basicRoleService: BasicRoleService) {}
	@Post("/basic/assign")
	async assignUserRole(
		@Req() req: RequestWithUserPayload,
		@Body() data: RoleGrantDTO,
	) {
		const { user } = req;
		try {
			await this.basicRoleService.grant(user, data);
		} catch (error) {
			console.log(error);
		}
		return {
			...successObj,
			message: "success",
		};
	}

	@Get("/basic/:type")
	async getUsersWithBasicRole(@Param("type", ParseIntPipe) role: Roles) {
		const users = await this.basicRoleService.getUsersWithRole(role);
		return {
			...successObj,
			data: users,
		};
	}
}
