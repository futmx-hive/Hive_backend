import { Controller, Get, Query } from "@nestjs/common";
import { TypesenseCollectionNames } from "src/typesense/constants";
import { TypesenseClientService } from "src/typesense/typesenseclient.service";
import { ProjectSearchDTO } from "./dto/search.dto";
import { SearchService } from "./search.service";

@Controller("search")
export class SearchController {
	constructor(
		private typesenseClient: TypesenseClientService,
		private readonly searchService: SearchService,
	) {}
	@Get("/project")
	searchForProjects(@Query() searchParams: ProjectSearchDTO) {
		return this.searchService.search<ProjectSearchDTO>(
			searchParams,
			TypesenseCollectionNames.PROJECT.name,
		);
	}
}
