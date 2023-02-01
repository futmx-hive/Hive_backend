import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserEntity } from "src/auth/model/user.entity";
import { degreeTypes } from "src/project/model/project.entity";
import { Student } from "src/student/model/student.entity";
import { degreeType } from "../types";
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
		type: [{ type: Types.ObjectId, ref: "assignees" }],
		required: true,
	})
	assignees: Array<Types.ObjectId>;

	@Prop({
		type: [{ type: Types.ObjectId, ref: Student.name }],
		required: true,
	})
	students: Array<Types.ObjectId>;

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
