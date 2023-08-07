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
					host: this.configService.get("TYPESENSE_DEV_HOST"),

					port: this.configService.get("TYPESENSE_DEV_PORT"),

					protocol: "http",
				},
			],
			apiKey: this.configService.getOrThrow<string>(
				"TYPESENSE_DEV_ADMIN_KEY",
			),
			connectionTimeoutSeconds: 5,
		});
	}
}
//
