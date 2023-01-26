import { Request } from "express";
import { UserDoc, UserEntity } from "src/auth/model/user.entity";

declare global {
	interface RequestWithUserPayload extends Request {
		user: UserDoc;
	}
	type ValueOf<T> = T[keyof T];
}
