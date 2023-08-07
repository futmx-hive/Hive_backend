import { Leap } from "@leap-ai/sdk";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

// This is a NodeJS-specific requirement - browsers implementations should omit this line.

@Injectable()
export class LeapClient {
	client: Leap;
	constructor(private readonly configService: ConfigService) {
		this.client = new Leap(this.configService.getOrThrow("LISP_API_KEY"));
		this.client.usePublicModel("sd-1.5");
	}
}
