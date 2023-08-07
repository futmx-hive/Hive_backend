import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Student } from "src/student/model/student.entity";
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
})
export class UserEntity {
	@Prop()
	first_name: string;
	@Prop()
	last_name: string;

	@Prop({ default: "mr", enum: ["mr", "dr", "mrs", "miss", "prof", "engr"] })
	title?: string;
	picture: string;
	@Prop({ index: true, required: true, trim: true, unique: true })
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
	role: Roles;
	@Prop({ enum: ["passwordless", "sso-google"], required: true, trim: true })
	connection_type: connectionTypes;
	@Prop({ type: Types.ObjectId, ref: "student" })
	s_id?: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
UserSchema.virtual("full_name").set(function (this: UserDoc) {
	return this.first_name + " " + this.last_name;
});
