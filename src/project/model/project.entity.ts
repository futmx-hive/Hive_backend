import { application_type, project_category } from "../types/proj_types";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
export type ProjectDoc = Project & Document;

@Schema({
	toJSON: {
		getters: true,
	},
	toObject: {
		getters: true,
	},
	timestamps: true,
})
export class Project {
	@Prop({ required: true, lowercase: true, index: true })
	title: string;
	category: project_category;

	// @Prop({ ref: "user", type: Types.ObjectId })
	@Prop({ required: true })
	owner: string;

	@Prop({ required: true, trim: true })
	description: string;

	@Prop({ required: true, default: false })
	is_application: boolean;

	@Prop({ default: "" })
	code_repo_url: string;

	@Prop({ default: "" })
	source_writeup: string;

	@Prop({ default: "" })
	cloned_code_repo_url: string;

	@Prop({ ref: "user", type: Types.ObjectId })
	supervisor: string;

	@Prop({ default: false })
	isApproved: boolean;

	@Prop({ default: new Date().getFullYear })
	year: number;
	@Prop({ default: "november" })
	month: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
