import { Body, Controller, Patch, Req } from "@nestjs/common";
import { successObj } from "src/utils";
import { studentDTO } from "./dto/student.dto";

import { StudentService } from "./student.service";

@Controller("student")
export class StudentController {
	constructor(private studentService: StudentService) {}

	@Patch()
	async updateStudentInfo(
		@Body() data: studentDTO,
		@Req() req: RequestWithUserPayload,
	) {
		const updatedStudentDetails =
			this.studentService.updateProjectStudentDetails(
				{
					owner: req.user.id,
				},
				data,
			);

		return {
			...successObj,
			data: updatedStudentDetails,
		};
	}
}
