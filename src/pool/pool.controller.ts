import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesSetter } from "src/auth/decorators/role.decorator";
import { Roles } from "src/auth/types/auth_types";
import { PoolService } from "./pool.service";

@RolesSetter(Roles.SUPER_ADMIN)
@Controller("pool")
@UseGuards(AuthGuard("jwt"))
export class PoolController {
	constructor(private service: PoolService) {}
}
