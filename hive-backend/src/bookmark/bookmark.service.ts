import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { successObj } from "src/utils";
import { BookmarkItemDTO } from "./dto/bookmark.item.dto";
import { Bookmark, BookmarkDoc } from "./models/bookmark.entity";
import { BookmarkItem } from "./models/bookmark.item.entity";

const bookmarkResponses = {
	CREATED: {
		success: "item added successfully",
		error: "failed to bookmark item",
	},
	DELETE: {
		success: "item deleted successfully",
		error: "failed to delete bookmark item",
	},
	UPDATE: {
		success: "update successful",
		error: "failed to update",
	},
};

@Injectable()
export class BookmarkService {
	constructor(
		@InjectModel(Bookmark.name)
		private readonly bookmarkColl: Model<BookmarkDoc>,
	) {}

	private async createUserBookmarkJotter(userId: string) {
		const existingJotter = await this.getExistingUserJotter({
			owner: userId,
		});
		if (existingJotter) {
			return existingJotter;
		}
		const Jotter = await this.bookmarkColl.create({
			owner: userId,
		});

		return Jotter;
	}

	async getExistingUserJotter(query: FilterQuery<BookmarkDoc>) {
		const existingJotter = await this.bookmarkColl.findOne(query);
		return existingJotter;
	}

	private hasExistingBookmarkItem(
		userJotter: Bookmark,
		projectId: Types.ObjectId,
	) {
		return userJotter.items.find(
			e => e.project_id.toString() === projectId.toString(),
		);
	}

	async asyncUpdateBookmarkItem(
		jotter: BookmarkDoc,
		id: Types.ObjectId,
		itemUpdate: BookmarkItemDTO,
	) {
		try {
			const { items } = jotter;
			const index = items.findIndex(
				e => e._id.toString() === id.toString(),
			);
			if (index < -1)
				throw new BadRequestException(bookmarkResponses.UPDATE.error);

			items[index] = itemUpdate;

			jotter.items = items;
			jotter.save();
			return {
				...successObj,
				data: jotter.toJSON(),
			};
		} catch (error) {}
	}

	async asyncCreateBookmarkItem(userId: string, item: BookmarkItemDTO) {
		try {
			const Jotter = await this.createUserBookmarkJotter(userId);
			if (this.hasExistingBookmarkItem(Jotter, item.project_id))
				return new BadRequestException(bookmarkResponses.CREATED.error);
			Jotter.items.push({
				category: item.category,
				project_id: item.project_id,
				project_title: item.project_title,
			});
			await Jotter.save();
			return {
				...successObj,
				message: bookmarkResponses.CREATED.success,
				data: Jotter.toJSON(),
			};
		} catch (error) {
			console.log(error);
			return new BadRequestException(bookmarkResponses.CREATED.error);
		}
	}

	async deleteBookmarkItem(Jotter: BookmarkDoc, itemId: Types.ObjectId) {
		try {
			const items = Jotter.items.filter(
				e => e._id.toString() !== itemId.toString(),
			);

			Jotter.items = items;

			await Jotter.save();
			return {
				...successObj,
				message: bookmarkResponses.DELETE.success,
				data: Jotter.toJSON(),
			};
		} catch (error) {
			console.log(error);
			throw new BadRequestException(bookmarkResponses.DELETE.error);
		}
	}
}
