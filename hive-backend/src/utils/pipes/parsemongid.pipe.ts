import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import { IsMongoId, validate, validateSync } from "class-validator";
import { Types } from "mongoose";

class mongoIdDTO {
	@IsMongoId()
	id: Types.ObjectId;
}

@Injectable()
export class MongoIdPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		const v = new mongoIdDTO();
		v.id = value;
		const err = validateSync(v);
		if (err.length) {
			throw err[0].toString();
		}
		return value;
	}
}
