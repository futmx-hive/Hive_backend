import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Assignee, AssigneeDoc } from "../model/assignee.entity";

@Injectable()
export class AssigneeService {
	constructor(
		@InjectModel(Assignee.name)
		private readonly assignees: Model<AssigneeDoc>,
	) {}

	async cuAssignee(poolId: Types.ObjectId, data: Assignee) {
		const { supervisor_id, students, pool, ...rest } = data;
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

	async BulkCreateAssignees() {}
}
