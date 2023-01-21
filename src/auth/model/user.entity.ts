import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { connectionTypes, Roles } from "../types/auth_types";

export type UserDoc = UserEntity & Document;
@Schema({
	toJSON: {
		getters: true,
		virtuals: true,
	},
	toObject: {
		getters: true,
		virtuals: true,
	},
	timestamps: true,
	virtuals: {
		full_name: function (this: UserDoc) {
			return this.first_name + " " + this.last_name;
		},
	},
})
export class UserEntity {
	@Prop({ alias: "firstName" })
	first_name: string;
	@Prop({ alias: "lastName" })
	last_name: string;
	@Prop({ default: "" })
	picture: string;
	@Prop({ index: true, required: true, trim: true })
	email: string;
	@Prop({ index: true, trim: true, default: undefined })
	occupation?: string;
	@Prop({ default: false })
	email_verified: boolean;
	@Prop({
		index: true,
		trim: true,
		minlength: 8,
		maxlength: 10,
	})
	phone?: string;
	@Prop({ default: false })
	phone_verified: boolean;
	@Prop({ default: Roles.BASIC, required: false })
	role: number;
	@Prop({ enum: ["passwordless", "sso-google"], required: true })
	connection_type: connectionTypes;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
