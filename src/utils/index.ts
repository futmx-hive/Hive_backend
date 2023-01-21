import { Injectable } from "@nestjs/common";
import * as crypto from "node:crypto";

export const successObj = {
	status: "success",
	success: true,
};

@Injectable()
export class UtilsService {
	getRandomProfilePic(fullname: string) {
		fullname = crypto
			.createHash("sha256")
			.update(fullname)
			.digest("base64url");
		const styles = [
			"bottts-neutral",
			"fun-emoji",
			"identicon",
			"avataaars-neutral",
			"adventurer-neutral",
		] as const;

		const keys = Object.keys(styles);
		const style = keys[Math.floor(Math.random() * keys.length)];

		const url = `https://api.dicebear.com/5.x/${style}/svg?seed=${fullname}`;
		return url;
	}
}
