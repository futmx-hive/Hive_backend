import { Injectable } from "@nestjs/common";
import { imageGen } from "src/image-generators";
import { LeapClient } from "../leap-client";

@Injectable()
export class LeapImageGenerator implements imageGen {
	constructor(private client: LeapClient) {}
	async generateImage(prompt: string) {
		try {
			const res = await this.client.client.generate.generateImage({
				prompt,
				enhancePrompt: true,
				height: 300,
				width: 300,
				numberOfImages: 1,
			});

			return res.data.images[0].uri;
		} catch (error) {
			console.log(error);
		}
	}
}
