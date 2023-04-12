import { BadRequestException, Injectable } from "@nestjs/common";
import { Document, Types } from "mongoose";

import { TypesenseError } from "typesense/lib/Typesense/Errors";
import { TypesenseCollectionNames } from "./constants";
import { operationType } from "./types";
import * as fs from "fs";
import { TypesenseClientService } from "./typesenseclient.service";

@Injectable()
export class TypesenseService {
	constructor(private readonly Client: TypesenseClientService) {}

	async index<T>(
		id: Types.ObjectId,
		entity: Partial<T & Document>,
		operationType: operationType,
		collectionName = TypesenseCollectionNames.PROJECT.name,
		schema = TypesenseCollectionNames.PROJECT.schema,
	) {
		try {
			const { _id, ...rest } = entity;
			const collectionExists = await this.Client.client
				.collections(collectionName)
				.exists();
			console.log({ collectionExists });
			if (!collectionExists) {
				await this.Client.client.collections().create(schema);
			}

			await this.Client.client
				.collections(collectionName)
				.documents()
				.upsert({ ...rest, id: _id });
			console.log("indexed");
		} catch (error) {
			// console.log(error);
			fs.appendFileSync(
				"./failed.log",
				JSON.stringify({
					collectionName,
					entity,
				}) + ",",
			);
			if (error instanceof TypesenseError) {
				throw new BadRequestException(
					error.message + " TYPESENSE--ERROR",
				);
			}
		}
	}

	async unindex(
		id: Types.ObjectId,
		collectionName = TypesenseCollectionNames.PROJECT.name,
	) {
		try {
			await this.Client.client
				.collections(collectionName)
				.documents((<unknown>id) as string)
				.delete();
			console.log("unindexed");
		} catch (error) {
			if (error instanceof TypesenseError) {
				throw new BadRequestException(
					error.message + " TYPESENSE--ERROR",
				);
			}
		}
	}
}
