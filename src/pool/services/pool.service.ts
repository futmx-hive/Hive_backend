import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { UserDoc } from "src/auth/model/user.entity";
import { StudentService } from "src/student/student.service";
import { PoolAssignee } from "../model/pool.assignee";
import { Pool, PoolDoc } from "../model/pool.entity";
import { PoolStudent } from "../model/pool.student";
import { Submission } from "../model/submissions.entity";
import { pool } from "../types";
import { AssigneeService } from "./assignee.service";

@Injectable()
export class PoolService {
	constructor(
		private readonly studentService: StudentService,
		@InjectModel(Pool.name) private readonly poolService: Model<PoolDoc>,
		private readonly assigneeService: AssigneeService,
	) {}

	async createPool(user: UserDoc, pool: pool) {
		const poolId = new Types.ObjectId()._id;
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

			const asssignees = await Promise.all(
				SupervisorsAndStudents.map(async s => {
					const assignee = await this.assigneeService.createAssignee(
						poolId,
						{
							pool: poolId,
							supervisor_id: s.supervisor_id,
							students: s.students.map(st => {
								return st._id;
							}),
						},
					);
					return Promise.resolve(assignee);
				}),
			);

			const poolAsssignees: Array<PoolAssignee> = asssignees.map(
				assignee => ({
					assignee: assignee._id,
					supervisor_id: assignee.supervisor_id,
				}),
			);

			const poolStudents: Array<PoolStudent> = [];

			for (const ass of asssignees) {
				const students = ass.students.map(stud => ({
					student: stud._id,
					assignee: ass._id as Types.ObjectId,
				}));
				poolStudents.push(...students);
			}

			const poolCreateRes = await this.poolService.create({
				_id: poolId,
				locked: false,
				students_type: pool.students_type,
				assignees: poolAsssignees,
				year: pool.year,
				description: pool.description,
				creator: user._id,
				students: poolStudents,
			});

			return poolCreateRes.toJSON();
		} catch (error) {
			console.log(error);
			throw new InternalServerErrorException(
				"error creating pool please try again",
			);
		}
	}
}
