import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Typesense, { Client } from "typesense";

@Injectable()
export class TypesenseClientService {
	client: Client;
	constructor(private readonly configService: ConfigService) {
		this.client = new Typesense.Client({
			nodes: [
				{
					host: this.configService.getOrThrow<string>(
						"TYPESENSE_DEV_HOST",
					), // For Typesense Cloud use xxx.a1.typesense.net
					port: this.configService.getOrThrow<number>(
						"TYPESENSE_DEV_PORT",
					), // For Typesense Cloud use 443
					protocol: "http", // For Typesense Cloud use https
				},
			],
			apiKey: this.configService.getOrThrow<string>(
				"TYPESENSE_DEV_ADMIN_KEY",
			),
			connectionTimeoutSeconds: 5,
		});
	}
}
