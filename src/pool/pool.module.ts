import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentModule } from "src/student/student.module";
import { Assignee, AssigneeSchema } from "./model/assignee.entity";
import { Pool, PoolSchema } from "./model/pool.entity";
import { PoolController } from "./pool.controller";
import { AssigneeService } from "./services/assignee.service";
import { PoolService } from "./services/pool.service";

@Module({
	imports: [
		StudentModule,
		MongooseModule.forFeature([
			{
				name: Pool.name,
				schema: PoolSchema,
			},
			{
				name: Assignee.name,
				schema: AssigneeSchema,
			},
		]),
	],
	providers: [PoolService, AssigneeService],
	controllers: [PoolController],
})
export class PoolModule {}
