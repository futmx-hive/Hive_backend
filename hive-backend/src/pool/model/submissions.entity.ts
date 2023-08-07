import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserEntity } from "src/auth/model/user.entity";
import { Student } from "src/student/model/student.entity";
export type RolesDoc = Submission & Document;
export type LinkDoc = Link & Document;
export type SubmissionDoc = Document & Submission;

export type submissionStatus = "approved" | "pending" | "rejected";
export enum submissionType {
	PROPOSAL = 0,
	CHAPTER_1 = 1,
	CHAPTER_2 = 2,
	CHAPTER_3 = 3,
	CHAPTER_4 = 4,
	CHAPTER_5 = 5,
}

const schemaOptions = {
	toJSON: {
		getters: true,
	},
	toObject: {
		getters: true,
	},
	timestamps: true,
};

@Schema()
class Link {
	@Prop({ type: String })
	title?: string;

	@Prop({ type: String })
	url: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);

@Schema(schemaOptions)
export class Submission {
	@Prop({ type: Types.ObjectId, ref: "pool" })
	pool: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: Student.name })
	owner: Types.ObjectId;

	@Prop({ type: Number })
	submission_type: submissionType;

	@Prop({ type: String })
	description: string;

	@Prop({ type: [LinkSchema] })
	links: Array<LinkDoc>;

	@Prop({ type: String })
	status: submissionStatus;

	@Prop({ type: Types.ObjectId, ref: UserEntity.name })
	approved_by?: Types.ObjectId;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
