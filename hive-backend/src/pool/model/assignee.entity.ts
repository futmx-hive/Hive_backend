import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Student } from "src/student/model/student.entity";
import { Pool } from "./pool.entity";
import { studentSubmissions } from "./student.submissions";
export type AssigneeDoc = Assignee & Document;

@Schema({
	toJSON: {
		getters: true,
	},
	toObject: {
		getters: true,
	},
})
export class Assignee {
	@Prop({
		type: [{ type: Types.ObjectId, ref: Student.name }],
		required: true,
		default: [],
	})
	students: Array<Types.ObjectId>;
	@Prop({
		type: [{ type: Types.ObjectId, ref: studentSubmissions.name }],
		required: true,
		default: [],
	})
	students_submissions?: Array<Types.ObjectId>;
	@Prop({ type: Types.ObjectId, ref: Student.name, required: true })
	supervisor_id: Types.ObjectId;

	@Prop({
		type: Types.ObjectId,
		required: true,
		ref: Pool.name,
	})
	pool: Types.ObjectId;
}

export const AssigneeSchema = SchemaFactory.createForClass(Assignee);
