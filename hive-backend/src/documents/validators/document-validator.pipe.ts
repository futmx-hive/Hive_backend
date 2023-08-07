import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { DocDetailsDTO } from "../dto/extracted-doc.dto";
import { docDetailsSuccess } from "../types";

export function validateDocDetails(details: docDetailsSuccess) {
	const instance = plainToInstance(DocDetailsDTO, details);
	const valResult = validateSync(instance);

	return valResult;
}
