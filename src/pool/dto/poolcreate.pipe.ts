import {
	PipeTransform,
	Injectable,
	ArgumentMetadata,
	BadRequestException,
} from "@nestjs/common";
import * as Joi from "joi";

export const createPoolSchema = Joi.object({
	year: Joi.number().min(2005).required(),
	creator: Joi.string().trim().required(),
	create_non_existent_students: Joi.boolean().default(true),
	students_type: Joi.string()
		.regex(/undergraduate|masters|phd/i)
		.trim()
		.required(),
	description: Joi.string().trim(),
	assignees: Joi.array()
		.has(
			Joi.object({
				supervisor_id: Joi.string().required(),
				students: Joi.array()
					.has(
						Joi.object({
							exam_num: Joi.string()
								.regex(/^m\d{7}$/i)
								.trim()
								.required(),
							first_name: Joi.string().trim().required().trim(),
							last_name: Joi.string().trim().required().trim(),
							matric_no: Joi.string()
								.trim()
								.required()
								.trim()
								.regex(/^\d{4}\/\d{1}\/\d{5}[A-Z]{2}$/),
						}),
					)
					.min(1)
					.max(10),
			}),
		)
		.min(1)
		.max(10),
});

@Injectable()
export class PoolDTOPipe implements PipeTransform {
	constructor(private readonly schema: Joi.ObjectSchema) {}
	transform(value: any, metadata: ArgumentMetadata) {
		const { error } = this.schema.validate(value);
		if (error) {
			throw new BadRequestException(error.message);
		}
		return value;
	}
}
