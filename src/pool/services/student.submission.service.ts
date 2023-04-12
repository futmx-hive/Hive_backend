import { Model, Types } from "mongoose";
import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
	studentSubmissions,
	studentSubmissionsDoc,
} from "../model/student.submissions";
import { Pool, PoolDoc } from "../model/pool.entity";

@Injectable()
export class studentSubmissionService {
	constructor(
		@InjectModel(studentSubmissions.name)
		private readonly studentSubmissions: Model<studentSubmissionsDoc>,
		@InjectModel(Pool.name)
		private readonly pools: Model<PoolDoc>,
	) {}
	async createSubmission(studentId: Types.ObjectId, poolID: Types.ObjectId) {
		return await this.studentSubmissions.create({
			student: studentId,
			pool: poolID,
			submissions: [],
		});
	}

	async createManyStudentSubmission(
		studentIds: Types.ObjectId[],
		poolID: Types.ObjectId,
	) {
		const chunk: studentSubmissions[] = studentIds.map(s => ({
			pool: poolID,
			student: s,
			// _id
		}));

		try {
			return await this.studentSubmissions.insertMany(chunk);
		} catch (error) {
			console.log(error);
			throw new BadRequestException("error creating student submissions");
		}
	}

	async getStudentSubmission(
		studentId: Types.ObjectId,
		poolId: Types.ObjectId,
	) {
		try {
			const existentPool = await this.pools.findOne({
				_id: poolId,
			});
			const existingStudent = existentPool.students.find(
				s => s.student.toString() === studentId.toString(),
			);
		} catch (error) {
			throw new BadRequestException("student or poold does not exist");
		}
	}
}
