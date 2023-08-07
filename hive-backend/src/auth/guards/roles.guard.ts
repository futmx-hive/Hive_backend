import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/role.decorator";
import { Roles } from "../types/auth_types";

@Injectable()
export class roleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const [role] = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
			context.getClass(),
			context.getHandler(),
		]);
		console.log({ role });
		if (!role) return true;
		const req: RequestWithUserPayload = context.switchToHttp().getRequest();

		return req.user.role >= role;
	}
}
