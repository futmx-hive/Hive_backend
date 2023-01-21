import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
export type BookmarkItemDoc = BookmarkItem & Document;

@Schema({
	toJSON: {
		getters: true,
	},
	toObject: {
		getters: true,
	},
})
export class BookmarkItem {
	@Prop({ type: Types.ObjectId })
	_id?: string;
	@Prop({ type: Types.ObjectId, ref: "project" })
	project_id: Types.ObjectId;
	@Prop({ required: true })
	category: string;
	@Prop({ required: true })
	project_title: string;
}

export const BookmarkItemSchema = SchemaFactory.createForClass(BookmarkItem);
