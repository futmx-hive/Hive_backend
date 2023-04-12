import { Injectable } from "@nestjs/common";
import { DreamStudioClient } from "../dream-studio-client";
import { DiffusionSampler } from "../generation/generation_pb";

import {
	buildGenerationRequest,
	executeGenerationRequest,
	onGenerationComplete,
} from "../helpers";
import { imageGen } from "src/image-generators";

@Injectable()
export class ImageGenerator implements imageGen {
	constructor(private readonly dsClient: DreamStudioClient) {}

	async generateImage(prompt: string) {
		try {
			const { client, metadata } = this.dsClient;

			const request = buildGenerationRequest(
				"stable-diffusion-512-v2-1",
				{
					type: "text-to-image",
					prompts: [
						{
							text: prompt,
						},
					],
					width: 512,
					height: 512,
					samples: 1,
					cfgScale: 13,
					steps: 25,
					sampler: DiffusionSampler.SAMPLER_K_DPMPP_2M,
				},
			);

			const response = await executeGenerationRequest(
				client,
				request,
				metadata,
			);
			console.log(response);
			await onGenerationComplete(response);
		} catch (error) {
			console.log(error);
		}
	}
}
