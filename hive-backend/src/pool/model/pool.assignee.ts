import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserEntity } from "src/auth/model/user.entity";
import { Assignee } from "./assignee.entity";
export type PoolAssigneeDoc = PoolAssignee & Document;

console.log({ name: Assignee });

@Schema({
	toJSON: {
		getters: true,
	},
	toObject: {
		getters: true,
	},
})
export class PoolAssignee {
	@Prop({
		type: Types.ObjectId,
		ref: "assignee",
		required: true,
	})
	assignee: Types.ObjectId;

	@Prop({
		type: Types.ObjectId,
		ref: UserEntity.name,
		required: true,
	})
	supervisor_id: Types.ObjectId;
}

export const PoolAssigneeSchema = SchemaFactory.createForClass(PoolAssignee);
