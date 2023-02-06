import {
	Controller,
	Get,
	ParseIntPipe,
	Post,
	Query,
	UseGuards,
	Body,
	UsePipes,
	Req,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesSetter } from "src/auth/decorators/role.decorator";
import { Roles } from "src/auth/types/auth_types";
import { PoolDTO, SupervisorStudentsDTO } from "./dto/poolcreate.dto";
import { createPoolSchema, PoolDTOPipe } from "./dto/poolcreate.pipe";
import { PoolService } from "./services/pool.service";
import { pool } from "./types";

@RolesSetter(Roles.SUPER_ADMIN)
@Controller("pool")
@UseGuards(AuthGuard("jwt"))
export class PoolController {
	constructor(private service: PoolService) {}

	@Get(":year")
	async getOnePool(@Query("year", ParseIntPipe) year: number) {
		return ` get a pool ${year}`;
	}
	@Post("")
	@UsePipes(new PoolDTOPipe(createPoolSchema))
	async createPool(
		@Body() payload: pool,
		@Req() req: RequestWithUserPayload,
	) {
		return this.service.createPool(req.user, payload);
	}
}
