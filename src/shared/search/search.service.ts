import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { TypesenseCollectionNames } from "src/typesense/constants";
import { SearchParams } from "typesense/lib/Typesense/Documents";
import { TypesenseClientService } from "../../typesense/typesenseclient.service";
import { ProjectSearchDTO } from "./dto/search.dto";

@Injectable()
export class SearchService {
	constructor(private readonly typesenseClient: TypesenseClientService) {}
	resolveSearchParams<T extends ProjectSearchDTO>(
		searchParams: T,
		collectionName: string,
	): SearchParams {
		if (collectionName === TypesenseCollectionNames.PROJECT.name) {
			return this.resolveProjectSearchParams(searchParams);
		}
	}
	async search<T extends ProjectSearchDTO>(
		searchParams: T,
		collectionName: string,
	) {
		const params = this.resolveSearchParams(searchParams, collectionName);

		try {
			return await this.typesenseClient.client
				.collections(collectionName)
				.documents()
				.search(params);
		} catch (error) {
			console.log(error);
			throw new InternalServerErrorException(
				"failed while attempting to search",
			);
		}
	}

	resolveProjectSearchParams(params: ProjectSearchDTO): SearchParams {
		if (params.from > params.to) {
			throw new ConflictException("dates mismatch error");
		}
		const obj: SearchParams = {
			q: params.query,
			page: params.page,
			query_by: "description,title,owner",
			filter_by: `year:[${params.from || 0}..${
				params.to || new Date().getFullYear()
			}]`,
			per_page: params.page_size || 20,
		};
		return obj;
	}
}
