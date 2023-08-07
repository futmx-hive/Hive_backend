import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types } from "mongoose";
import { studentSubmissionsDoc } from "../model/student.submissions";
import { SubmissionDTO } from "../dto/submission.dto";
import {
	LinkDoc,
	Submission,
	SubmissionDoc,
	submissionType,
} from "../model/submissions.entity";

@Injectable()
export class SingleSubmissionService {
	constructor(
		@InjectModel(Submission.name)
		private readonly SubmissionRepo: Model<SubmissionDoc>,
	) {}

	async getSubmission(studentSumissionId: Types.ObjectId) {
		return this.SubmissionRepo.findOne({
			_id: studentSumissionId,
		});
	}

	private async canSubmitNext(
		previousSubmission: submissionType,
		poolId: string | Types.ObjectId,
		studentId: string | Types.ObjectId,
	) {
		const res: {
			canSubmitNext: boolean;
			existingDoc: null | (SubmissionDoc & Submission);
		} = {
			canSubmitNext: false,
			existingDoc: null,
		};
		if (previousSubmission > submissionType.CHAPTER_5) {
			return res;
		}
		if (Number(previousSubmission + 1) > submissionType.PROPOSAL) {
			const allPreviouslyExistingSubmissions =
				await this.SubmissionRepo.find({
					pool: poolId,
					submission_type: {
						$lt: previousSubmission + 1,
					},
					owner: studentId,
					status: "approved",
				});

			console.log({ allPreviouslyExistingSubmissions });
			if (
				allPreviouslyExistingSubmissions.length !==
				previousSubmission + 1
			) {
				return res;
			}
		}

		const existing = await this.SubmissionRepo.findOne({
			pool: poolId,
			submission_type: previousSubmission + 1,
			owner: studentId,
		});

		if (
			existing &&
			(existing.status === "pending" || existing.status === "rejected")
		) {
			return {
				canSubmitNext: false,
				existingDoc: existing,
			};
		}
		if (existing && existing.status === "approved") {
			return res;
		}

		const existingPrevious = await this.SubmissionRepo.findOne({
			pool: poolId,
			submission_type: previousSubmission,
			owner: studentId,
		});
		if (Number(previousSubmission) != -1) {
			if (existingPrevious && existingPrevious.status !== "approved") {
				return res;
			}
		}

		return {
			canSubmitNext: true,
			existingDoc: null,
		};
	}

	async approveSubmission(submissionId:string|Types.ObjectId){
		
	}

	async createSubmission(data: SubmissionDTO) {
		const { pool_id, student_id, submission_type, description, links } =
			data;

		const res = await this.canSubmitNext(
			submission_type - 1,
			pool_id,
			student_id,
		);

		if (!res.canSubmitNext) {
			if (res.existingDoc) {
				res.existingDoc.owner = student_id;
				res.existingDoc.submission_type = submission_type;
				res.existingDoc.description = description;
				res.existingDoc.links = links.map(l => ({
					url: l,
				})) as LinkDoc[];
				await res.existingDoc.save();

				return res.existingDoc;
			}
			throw new BadRequestException("you cant submit at this time");
		}

		try {
			const newSubmission = await this.SubmissionRepo.create({
				owner: student_id,
				submission_type,
				description,
				status: "pending",
				links: links.map(l => ({
					url: l,
				})),
				pool: pool_id,
			});

			return newSubmission;
		} catch (error) {
			throw new InternalServerErrorException(
				"error occured during submission please try again",
			);
		}
	}

	async findSubmissions(query: FilterQuery<studentSubmissionsDoc>) {
		return this.SubmissionRepo.find(query);
	}

	// async makeSubmission() {}
}
