import { EnvVarDTO } from "./dto/env.dto";
import { validateSync } from "class-validator";
import { plainToInstance } from "class-transformer";

export function validateENV(config: Record<string, any>) {
	const envChunk = plainToInstance(EnvVarDTO, config);

	const res = validateSync(envChunk);
	if (res.length) {
		console.log(res);
		throw new Error(
			"oopsie! environment variables missing,invalid or incomplete",
		);
	}

	return envChunk;
}
