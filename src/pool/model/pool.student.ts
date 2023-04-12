import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Student } from "src/student/model/student.entity";
import { Assignee } from "./assignee.entity";
import { studentSubmissions } from "./student.submissions";
export type PoolStudentDoc = PoolStudent & Document;

@Schema({
	toJSON: {
		getters: true,
	},
	toObject: {
		getters: true,
	},
})
export class PoolStudent {
	@Prop({ type: Types.ObjectId, ref: Student.name })
	student: Types.ObjectId;

	@Prop({
		type: Types.ObjectId,
		ref: "assignee",
		required: true,
	})
	assignee: Types.ObjectId;
	@Prop({
		type: Types.ObjectId,
		ref: studentSubmissions.name,
		required: true,
	})
	student_submission: Types.ObjectId;
}

export const PoolStudentSchema = SchemaFactory.createForClass(PoolStudent);
