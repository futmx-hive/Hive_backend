import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import {
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { keys } from "../utils/getKeys";
import { AuthService } from "../services/auth.service";
import { TokenPayload } from "../types/auth_types";
import { UserService } from "../services/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		public authService: AuthService,
		private userService: UserService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: keys.publicKey,
		});
	}

	async validate(payload: TokenPayload) {
		const user = await this.userService.getUser({ _id: payload.sub });

		if (!user) {
			throw new ForbiddenException();
		}
		return { ...user.toObject() };
	}
}
