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
	Param,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Types } from "mongoose";
import { RolesSetter } from "src/auth/decorators/role.decorator";
import { Roles } from "src/auth/types/auth_types";
import { successObj } from "src/utils";
import { MongoIdPipe } from "src/utils/pipes/parsemongid.pipe";
import { PoolDTO, SupervisorStudentsDTO } from "./dto/poolcreate.dto";
import { createPoolSchema, PoolDTOPipe } from "./dto/poolcreate.pipe";
import { PoolService } from "./services/pool.service";
import { pool } from "./types";

@RolesSetter(Roles.SUPER_ADMIN)
@Controller("pool")
@UseGuards(AuthGuard("jwt"))
export class PoolController {
	constructor(private service: PoolService) {}

	// async getOnePool(@Query("year", ParseIntPipe) year: number) {
	// 	return ` get a pool ${year}`;
	// }
	@Post("")
	@UsePipes(new PoolDTOPipe(createPoolSchema))
	async createPool(
		@Body() payload: pool,
		@Req() req: RequestWithUserPayload,
	) {
		const result = await this.service.createPool(req.user, payload);

		return {
			...successObj,
			data: result,
		};
	}

	@Get(":id")
	async getPool(@Param("id", MongoIdPipe) id: Types.ObjectId) {
		console.log(id);
		const poolData = await this.service.getOnePool(id);

		return {
			...successObj,
			data: poolData,
		};
	}
	@Get()
	async listpools() {}
}
