import { Request } from "express";
import { TokenPayload } from "./src/auth/types/auth_types";

declare global {
	interface RequestWithTokenPayload extends Request {
		user: TokenPayload;
	}
}
