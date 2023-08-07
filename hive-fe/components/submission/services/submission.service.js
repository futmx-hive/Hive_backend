import base from "../../../services/config";
import { client } from "@components/config/api";

export class Submission {
	static headers() {
		return {
			headers: base.authH(),
		};
	}

	static async submitChapters(body) {
		return client.post(
			"student/submission/create",
			{
				...body,
				pool_id: "643de521dd1112d463e7053f",
				student_id: "643dd8bd68149222fe44b5cc",
			},
			Submission.headers(),
		);
	}
}
