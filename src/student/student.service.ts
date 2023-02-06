import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, InsertManyResult, Model, Types } from "mongoose";
import { UserDoc } from "src/auth/model/user.entity";
import { studentPoolObj } from "src/pool/types";
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
		query: FilterQuery<StudentDoc>,
		update: studentDTO,
	) {
		try {
			return this.students.findOneAndUpdate(query, update);
		} catch (error) {
			throw new BadRequestException("failded while updating user info");
		}
	}

	async createManyStudents(students: studentPoolObj[]) {
		type studentPoolWithId = Partial<studentPoolObj> & {
			id?: Types.ObjectId;
		};

		const studentsMap = new Map<string, studentPoolWithId>();
		students = students.map(e => {
			const el = {
				...e,
				exam_num: e.exam_num.toUpperCase(),
				matric_no: e.matric_no.toUpperCase(),
			};
			studentsMap.set(el.exam_num, el);
			return el;
		});
		const toBeUpdated: studentPoolWithId[] = [];
		let toBeCreated: studentPoolWithId[] = [];
		try {
			const existent = await this.students.find({
				exam_num: {
					$in: [...students.map(e => e.exam_num)],
				},
			});

			if (existent)
				existent.map(e =>
					toBeUpdated.push({
						...e.toJSON(),
						exam_num: studentsMap.get(e.exam_num).exam_num,
						matric_no: studentsMap.get(e.exam_num).matric_no || "",
						id: e._id,
					}),
				);
			toBeCreated = students.filter(
				stu =>
					!existent.some(
						existingStu => existingStu.exam_num === stu.exam_num,
					),
			);

			const createMany = await this.students.insertMany(
				toBeCreated.map(e => ({
					matric_no: e.matric_no,
					exam_num: e.exam_num,
					owner: new Types.ObjectId()._id,
					temp_name: e.first_name + " " + e.last_name,
				})),
			);

			return [
				...createMany.map(e => e.toJSON({ getters: true })),
				...toBeUpdated,
			];
		} catch (error) {
			console.log(error);
			throw new InternalServerErrorException();
		}
	}
}
