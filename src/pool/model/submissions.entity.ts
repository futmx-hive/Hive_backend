import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Mongoose, Types, Schema as SchemaClass } from "mongoose";
import { Student } from "src/student/model/student.entity";
export type RolesDoc = Submission & Document;
export type LinkDoc = Link & Document;

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
	title: string;

	@Prop({ type: String })
	url: string;

	@Prop({ type: Types.ObjectId })
	_id?: Types.ObjectId;
}

export const LinkSchema = SchemaFactory.createForClass(Link);

@Schema(schemaOptions)
export class Submission {
	@Prop({ type: Types.ObjectId, ref: Student.name })
	owner: Array<Types.ObjectId>;

	@Prop({ type: Number })
	submission_type: submissionType;

	@Prop({ type: String })
	title: string;

	@Prop({ type: String })
	description: string;

	@Prop({ type: [LinkSchema] })
	links: Array<LinkDoc>;

	@Prop({ type: Boolean })
	approved: boolean;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
