import * as Generation from "./generation/generation_pb";
import { GenerationServiceClient } from "./generation/generation_pb_service";
import { grpc as GRPCWeb } from "@improbable-eng/grpc-web";
import { NodeHttpTransport } from "@improbable-eng/grpc-web-node-http-transport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

// This is a NodeJS-specific requirement - browsers implementations should omit this line.

@Injectable()
export class DreamStudioClient {
	client: GenerationServiceClient;
	metadata: GRPCWeb.Metadata;
	constructor(private readonly configService: ConfigService) {
		GRPCWeb.setDefaultTransport(NodeHttpTransport());

		// Authenticate using your API key, don't commit your key to a public repository!
		const metadata = new GRPCWeb.Metadata();
		metadata.set(
			"Authorization",
			"Bearer " +
				this.configService.getOrThrow<string>("DREAM_STUDIO_API_KEY"),
		);
		this.metadata = metadata;
		// Create a generation client to use with all future requests
		const client = new GenerationServiceClient(
			"https://grpc.stability.ai",
			{},
		);
		this.client = client;
	}
}
