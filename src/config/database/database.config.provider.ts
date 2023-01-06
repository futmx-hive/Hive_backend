import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
	MongooseModuleOptions,
	MongooseOptionsFactory,
} from "@nestjs/mongoose";

@Injectable()
export class DatabaseProvider implements MongooseOptionsFactory {
	constructor(private configurations: ConfigService) {}
	createMongooseOptions():
		| MongooseModuleOptions
		| Promise<MongooseModuleOptions> {
		console.log(this.configurations.getOrThrow<string>("mongo_url"));
		return {
			uri: this.configurations.getOrThrow<string>("mongo_url"),
			retryAttempts: 5,
		};
	}
}
