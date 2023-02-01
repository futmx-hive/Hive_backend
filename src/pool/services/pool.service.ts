import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDoc } from "src/auth/model/user.entity";
import { StudentService } from "src/student/student.service";
import { Pool, PoolDoc } from "../model/pool.entity";
import { Submission } from "../model/submissions.entity";
import { pool } from "../types";

@Injectable()
export class PoolService {
	constructor(
		private readonly studentService: StudentService,
		@InjectModel(Pool.name) private readonly poolService: Model<PoolDoc>,
	) {}

	async createPool(user: UserDoc, pool: pool) {
		try {
			const SupervisorsAndStudents = await Promise.all(
				pool.assignees.map(async ({ students, supervisor_id }) => {
					const newStudents =
						await this.studentService.createManyStudents(students);
					return Promise.resolve({
						supervisor_id,
						students: newStudents,
					});
				}),
			);

			const poolCreateRes = await this.poolService.create({
				locked: false,
				students_type: pool.students_type,
				year: pool.year,
				description: pool.description,
				creator: user._id,
			});
		} catch (error) {
			throw new InternalServerErrorException(
				"error creating pool please try again",
			);
		}
	}
}
