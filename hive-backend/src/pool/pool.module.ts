import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentModule } from "src/student/student.module";
import { Assignee, AssigneeSchema } from "./model/assignee.entity";
import { PoolAssignee, PoolAssigneeSchema } from "./model/pool.assignee";
import { Pool, PoolSchema } from "./model/pool.entity";
import {
	studentSubmissions,
	studentSubmissionsSchema,
} from "./model/student.submissions";
import { PoolController } from "./pool.controller";
import { AssigneeService } from "./services/assignee.service";
import { PoolService } from "./services/pool.service";
import { studentSubmissionService } from "./services/student.submission.service";
import { SubmissionController } from "./submissions.controller";
import { SingleSubmissionService } from "./services/single-submission.service";
import { Submission, SubmissionSchema } from "./model/submissions.entity";

@Module({
	imports: [
		StudentModule,
		MongooseModule.forFeature([
			{
				name: studentSubmissions.name,
				schema: studentSubmissionsSchema,
			},
			{
				name: Submission.name,
				schema: SubmissionSchema,
			},
			{
				name: Pool.name,
				schema: PoolSchema,
			},
			{
				name: PoolAssignee.name,
				schema: PoolAssigneeSchema,
			},
			{
				name: Assignee.name,
				schema: AssigneeSchema,
			},
		]),
	],
	providers: [
		PoolService,
		AssigneeService,
		studentSubmissionService,
		SingleSubmissionService,
	],
	controllers: [PoolController, SubmissionController],
})
export class PoolModule {}
