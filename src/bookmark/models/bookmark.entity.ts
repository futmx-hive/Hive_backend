import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { BookmarkItem, BookmarkItemSchema } from "./bookmark.item.entity";
export type BookmarkDoc = Bookmark & Document;

@Schema({
	toJSON: {
		getters: true,
	},
	toObject: {
		getters: true,
	},
	timestamps: true,
})
export class Bookmark {
	@Prop({ type: Types.ObjectId, ref: "userentity" })
	owner: Types.ObjectId;

	@Prop([BookmarkItemSchema])
	items: BookmarkItem[];
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
