import { Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ProfileService } from "./profile.service";

@Controller("profile")
@UseGuards(AuthGuard("jwt"))
export class ProfileController {
	constructor(private service: ProfileService) {}

	@Get(":id")
	getProfile() {
		return "get profile";
	}

	@Patch(":id")
	updateProfile() {
		return "update profile";
	}
}
