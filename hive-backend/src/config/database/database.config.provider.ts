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
			uri: !(process.env.NODE_ENV === "production")
				? this.configurations.getOrThrow<string>("mongo_url")
				: "mongodb://hivek:iw2345ASEEF@mongo:27017/testify?authSource=testify",
			retryAttempts: 1,
		};
		console.log(data);
		return data;
	}
}
