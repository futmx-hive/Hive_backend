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
import { roleGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/types/auth_types";
import { successObj } from "src/utils";
import { MongoIdPipe } from "src/utils/pipes/parsemongid.pipe";
import { AssigneeStudentsPayload } from "./dto/assignee/assignee.students.dto";
import { PoolDTO, SupervisorStudentsDTO } from "./dto/poolcreate.dto";
import { createPoolSchema, PoolDTOPipe } from "./dto/poolcreate.pipe";
import { PoolBasicFilter } from "./dto/poolfilter.dto";
import { StudentPoolDataDTO } from "./dto/studen.supervisor.dto";
import { SubmissionDTO } from "./dto/submission.dto";
import { AssigneeService } from "./services/assignee.service";
import { PoolService } from "./services/pool.service";
import { pool } from "./types";

@Controller("pool")
@UseGuards(AuthGuard("jwt"), roleGuard)
export class PoolController {
	constructor(
		private service: PoolService,
		private assigneeService: AssigneeService,
	) {}

	// async getOnePool(@Query("year", ParseIntPipe) year: number) {
	// 	return ` get a pool ${year}`;
	// }
	@Post("")
	@RolesSetter(Roles.SUPER_ADMIN)
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

	@Get("search")
	@RolesSetter(Roles.STUDENT)
	async SearchForPool(@Query() filter: PoolBasicFilter) {
		const data = await this.service.filterPool(filter);

		return {
			...successObj,
			data,
		};
	}

	@Get(":id")
	@RolesSetter(Roles.SUPER_ADMIN)
	async getPool(@Param("id", MongoIdPipe) id: Types.ObjectId) {
		console.log(id);
		const poolData = await this.service.getOnePool(id);

		return {
			...successObj,
			data: poolData,
		};
	}

	@Get("")
	@RolesSetter(Roles.SUPER_ADMIN)
	async getPools() {
		const poolData = await this.service.getAllPools();

		return {
			...successObj,
			data: poolData,
		};
	}

	@Post("assignees/students")
	@RolesSetter(Roles.SUPERVISOR)
	async getAssigneeStudents(@Body() data: AssigneeStudentsPayload) {
		console.log({
			_id: data.assignee_id,
			pool: data.pool_id,
		});
		const students = await this.assigneeService
			.findAssignee({
				_id: data.assignee_id,
				pool: new Types.ObjectId(data.pool_id),
			})
			.populate({
				path: "students",
			})
			.exec();
		return {
			...successObj,
			data: students,
		};
	}
}
