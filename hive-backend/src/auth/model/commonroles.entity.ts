import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserEntity } from "./user.entity";
export type RolesDoc = UserLevelIAM & Document;
@Schema({
	toJSON: {
		getters: true,
	},
	toObject: {
		getters: true,
	},
})
export class UserLevelIAM {
	@Prop({ type: [{ type: Types.ObjectId, ref: UserEntity.name }] })
	super_admins: Array<Types.ObjectId>;

	@Prop({ type: [{ type: Types.ObjectId, ref: UserEntity.name }] })
	supervisors: Array<Types.ObjectId>;
}
console.log(UserLevelIAM.name);

export const UserLevelIAMchema = SchemaFactory.createForClass(UserLevelIAM);
