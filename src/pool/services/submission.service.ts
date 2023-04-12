import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import {
	studentSubmissions,
	studentSubmissionsDoc,
} from "../model/student.submissions";

@Injectable()
export class SubmissionService {
	constructor(
		@InjectModel(studentSubmissions.name)
		private readonly studentSubmissions: Model<studentSubmissionsDoc>,
	) {}

	async getSubmission(studentSumissionId: Types.ObjectId) {
		return this.studentSubmissions.findOne({
			_id: studentSumissionId,
		});
	}

	async findSubmissions(query: FilterQuery<studentSubmissionsDoc>) {
		return this.studentSubmissions.find(query);
	}

	async makeSubmission() {}
}
