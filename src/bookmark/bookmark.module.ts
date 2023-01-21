import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BookmarkController } from "./bookmark.controller";
import { BookmarkService } from "./bookmark.service";
import { Bookmark, BookmarkSchema } from "./models/bookmark.entity";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Bookmark.name, schema: BookmarkSchema },
		]),
	],
	providers: [BookmarkService],
	controllers: [BookmarkController],
})
export class BookmarkModule {}
