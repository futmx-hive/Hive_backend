import { Prop, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
	toJSON: {
		getters: true,
	},
})
export class UserEntity {
	@Prop()
	first_name: string;
	@Prop()
	last_name: string;
	@Prop()
	picture: string;
	@Prop()
	email: string;
	@Prop()
	email_verified: boolean;
}
