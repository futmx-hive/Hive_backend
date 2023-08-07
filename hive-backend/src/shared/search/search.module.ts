import { Module } from "@nestjs/common";
import { TypesenseClientService } from "src/typesense/typesenseclient.service";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

@Module({
	controllers: [SearchController],
	providers: [SearchService, TypesenseClientService],
})
export class SearchModule {}
