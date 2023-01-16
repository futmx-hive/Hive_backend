import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type OTPDoc = OTP & Document;
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
	expires: number;

	@Prop({ required: true })
	code: string;

	@Prop({ required: true })
	grantee: string;
}

export const OTPSchema = SchemaFactory.createForClass(OTP);
