import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { UserDoc } from "src/auth/model/user.entity";
import { UtilsService } from "src/utils";
import { studentDTO } from "./dto/student.dto";
import { Student, StudentDoc } from "./model/student.entity";

@Injectable()
export class StudentService {
	constructor(
		@InjectModel(Student.name) private readonly students: Model<StudentDoc>,
		private readonly utils: UtilsService,
	) {}
	async existingStudent(q: FilterQuery<StudentDoc>) {
		try {
			const user = await this.students.findOne(q);
			return user;
		} catch (error) {
			throw new BadRequestException("error occured ");
		}
	}
	async createProjectStudent(user: UserDoc, data: studentDTO & Student) {
		const examNum = this.utils.extractExamNumFromEmail(user.email);
		try {
			if (
				!examNum ||
				(await this.existingStudent({ exam_num: examNum }))
			) {
				return false;
			}
			const student = await this.students.create({
				matric_no: data.matric_no,
				exam_num: examNum,
				owner: user.id,
			});
			user.s_id = student.id;
			await user.save();
			return student;
		} catch (error) {
			throw new InternalServerErrorException(
				"error occured while generating student info",
			);
		}
	}
	async updateProjectStudentDetails(
		uid: Types.ObjectId | string,
		update: studentDTO,
	) {
		try {
			return this.students.findOneAndUpdate({ owner: uid }, update);
		} catch (error) {
			throw new BadRequestException("failded while updating user info");
		}
	}
}
