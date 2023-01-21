import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	Req,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { Types } from "mongoose";
import { TokenPayload } from "src/auth/types/auth_types";
import { successObj } from "src/utils";
import { BookmarkService } from "./bookmark.service";
import { BookmarkItemDTO } from "./dto/bookmark.item.dto";

@Controller("/bookmark")
@UseGuards(AuthGuard("jwt"))
export class BookmarkController {
	constructor(private bookmarkService: BookmarkService) {}

	@Post("")
	async createBookmark(
		@Body() item: BookmarkItemDTO,
		@Req() req: RequestWithTokenPayload,
	) {
		return await this.bookmarkService.asyncCreateBookmarkItem(
			req.user.sub,
			item,
		);
	}

	@Get(":id?")
	async getUserBookmarks(
		@Req() req: RequestWithTokenPayload,
		@Param("id") id: string,
	) {
		const jotter = await this.bookmarkService.getExistingUserJotter({
			owner: req.user.sub,
		});
		return {
			...successObj,
			data: jotter,
		};
	}

	@Put(":id")
	async updateBookmark() {
		return "bookmarks updated";
	}

	@Delete(":id")
	async deleteBookmarkItem(
		@Param("id") itemId: Types.ObjectId,
		@Req() req: RequestWithTokenPayload,
	) {
		const jotter = await this.bookmarkService.getExistingUserJotter({
			id: req.user.sub,
		});
		if (!jotter) throw new BadRequestException("not found");
		console.log({ jotter });
		return await this.bookmarkService.deleteBookmarkItem(jotter, itemId);
	}
}
