import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UtilsService } from "src/utils";
import { Student, StudentSchema } from "./model/student.entity";
import { StudentController } from "./student.controller";

import { StudentService } from "./student.service";

@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: Student.name,
				useFactory() {
					const schema = StudentSchema;
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					schema.plugin(require("mongoose-autopopulate"));

					return schema;
				},
			},
		]),
	],
	providers: [StudentService, UtilsService],
	exports: [StudentService, UtilsService],
	controllers: [StudentController],
})
export class StudentModule {}
