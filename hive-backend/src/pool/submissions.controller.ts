import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Put,
	Req,
	UnauthorizedException,
	UseGuards,
} from "@nestjs/common";
import { SubmissionDTO } from "./dto/submission.dto";
import { AuthGuard } from "@nestjs/passport";
import { roleGuard } from "src/auth/guards/roles.guard";
import { RolesSetter } from "src/auth/decorators/role.decorator";
import { Roles } from "src/auth/types/auth_types";
import { SingleSubmissionService } from "./services/single-submission.service";
@Controller("student")
@UseGuards(AuthGuard("jwt"), roleGuard)
@RolesSetter(Roles.STUDENT)
export class SubmissionController {
	constructor(private readonly ISubmissionService: SingleSubmissionService) {}

	@Get("/submission/:studentId")
	async getStudentSubmissions() {}

	@Post("/submission/create")
	@HttpCode(201)
	async createSubmission(
		@Body() data: SubmissionDTO,
		@Req() req: RequestWithUserPayload,
	) {
		const { user } = req;
		if (user.role !== Roles.STUDENT) {
			throw new UnauthorizedException("you cant make this submission");
		}
		console.log(1);
		return this.ISubmissionService.createSubmission(data);
	}

	@Put("")
	async updateSubmission() {}

	@Post("validate")
	async validateSubmission() {}
}
