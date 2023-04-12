import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
	MongooseModuleOptions,
	MongooseOptionsFactory,
} from "@nestjs/mongoose";

@Injectable()
export class DatabaseProvider implements MongooseOptionsFactory {
	constructor(private configurations: ConfigService) {}
	async createMongooseOptions(): Promise<MongooseModuleOptions> {
		const data = {
			uri: this.configurations.getOrThrow<string>("mongo_url"),
			retryAttempts: 5,
		};
		console.log(data);
		return data;
	}
}
