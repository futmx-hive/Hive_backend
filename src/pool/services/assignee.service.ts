import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { Assignee, AssigneeDoc } from "../model/assignee.entity";

@Injectable()
export class AssigneeService {
	constructor(
		@InjectModel(Assignee.name)
		private readonly assignees: Model<AssigneeDoc>,
	) {}

	async cuAssignee(poolId: Types.ObjectId, data: Assignee) {
		const { supervisor_id, students, pool, ...rest } = data;
		console.log({ data });
		try {
			const res = await this.assignees.findOneAndUpdate(
				{
					supervisor_id: data.supervisor_id,
					pool: poolId,
				},
				{ supervisor_id, students, pool, ...rest },
				{
					upsert: true,
				},
			);
			return res;
		} catch (error) {
			throw new BadRequestException(
				"error occured while creating assignee",
			);
		}
	}
	async createAssignee(poolId: Types.ObjectId, data: Assignee) {
		const { supervisor_id, students, pool, ...rest } = data;
		try {
			const existent = await this.existingAssignee({
				supervisor_id: data.supervisor_id,
				pool: poolId,
			});
			if (existent) {
				return existent;
			}
			console.log({ existent });
			const res = await this.assignees.create({
				supervisor_id,
				students,
				pool,
				...rest,
			});
			console.log({ res });
			return res;
		} catch (error) {
			throw new BadRequestException(
				"error occured while creating assignee",
			);
		}
	}
	async BulkCreateAssignees() {}

	async existingAssignee(query: FilterQuery<AssigneeDoc>) {
		return await this.assignees.findOne(query);
	}
	async getAssigneeStudentsProject(
		assigneeId: Types.ObjectId,
		supervisorId: Types.ObjectId,
	) {
		const Assignee = await this.assignees.findOne({
			_id: assigneeId,
			supervisor_id: supervisorId,
		});
	}
}
