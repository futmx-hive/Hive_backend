import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserEntity } from "src/auth/model/user.entity";
import { degreeTypes } from "src/project/model/project.entity";
import { degreeType } from "../types";
import { PoolAssignee, PoolAssigneeSchema } from "./pool.assignee";
import { PoolStudent, PoolStudentSchema } from "./pool.student";
import { studentSubmissions } from "./student.submissions";
export type PoolDoc = Pool & Document;

@Schema({
	toJSON: {
		getters: true,
	},
	toObject: {
		getters: true,
	},
})
export class Pool {
	@Prop({ type: Boolean, default: false })
	locked: boolean;

	@Prop({
		type: [PoolAssigneeSchema],
		required: true,
	})
	assignees: Array<PoolAssignee>;

	@Prop({
		type: [PoolStudentSchema],
		required: true,
	})
	students: Array<PoolStudent>;

	@Prop({
		type: [{ type: Types.ObjectId, ref: studentSubmissions.name }],
		default: [],
	})
	studentSubmissions: Array<Types.ObjectId>;

	@Prop({ type: String, enum: degreeTypes })
	students_type: degreeType;

	@Prop({ type: Number, required: true })
	year: number;

	@Prop({ type: Types.ObjectId, ref: UserEntity.name })
	creator: Types.ObjectId;

	@Prop({ type: String, required: true })
	description: string;
}

export const PoolSchema = SchemaFactory.createForClass(Pool);

PoolSchema.virtual("number_of_supervisors").get(function (this: PoolDoc) {
	return this.assignees.length;
});
PoolSchema.virtual("number_of_students").get(function (this: PoolDoc) {
	return this.students.length;
});
