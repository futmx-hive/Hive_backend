import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserEntity } from "./user.entity";
export type AuthenticatorDoc = OTP & Document;
@Schema({
	toJSON: {
		getters: true,
	},
	toObject: {
		getters: true,
	},
})
export class OTP {
	@Prop({ required: true })
	credential_id: string;

	@Prop({ required: true, default: 0, type: Number })
	counter?: number;

	@Prop({
		required: true,
		default: 0,
		type: Types.ObjectId,
		ref: UserEntity.name,
	})
	owner: Types.ObjectId;
	@Prop({ required: true })
	grantee: string;
}

export const OTPSchema = SchemaFactory.createForClass(OTP);
