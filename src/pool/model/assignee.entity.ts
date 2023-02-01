import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserEntity } from "src/auth/model/user.entity";
import { degreeTypes } from "src/project/model/project.entity";
import { Student } from "src/student/model/student.entity";
import { Pool } from "./pool.entity";
import { Submission, SubmissionSchema } from "./submissions.entity";
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
	})
	students: Array<Types.ObjectId>;

	@Prop({
		type: [{ type: Types.ObjectId, ref: Student.name }],
		required: true,
	})
	supervisor_id: Array<Types.ObjectId>;

	@Prop({
		type: Types.ObjectId,
		required: true,
		ref: Pool.name,
	})
	pool: Types.ObjectId;

	@Prop({ type: [SubmissionSchema] })
	submissions?: Submission[];
}

export const AssigneeSchema = SchemaFactory.createForClass(Assignee);
