import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Student } from "src/student/model/student.entity";
import { Pool } from "./pool.entity";
import { Submission } from "./submissions.entity";
export type studentSubmissionsDoc = studentSubmissions & Document;

@Schema({
	toJSON: {
		getters: true,
	},
	toObject: {
		getters: true,
	},
})
export class studentSubmissions {
	@Prop({ type: Types.ObjectId, ref: Student.name })
	student: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: "pool" })
	pool: Types.ObjectId;

	@Prop({
		type: [{ type: Types.ObjectId, ref: Student.name }],
		required: true,
	})
	supervisor_id: Array<Types.ObjectId>;

	@Prop({ type: Types.ObjectId, ref: Submission.name })
	submissions?: Array<Types.ObjectId>;
}

export const studentSubmissionsSchema =
	SchemaFactory.createForClass(studentSubmissions);
