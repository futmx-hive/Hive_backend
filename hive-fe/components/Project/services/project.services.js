import { client } from "@components/config/api";
import { fileTypes } from "@utils/services/docsHandler.service";
import { base } from "services/config";

export class ProjectService {
	static async uploadSingle(data, extras, onUploadProgress, abortController) {
		const payload = new FormData();
		const { file } = data.files[0];

		payload.set("project_file", file);
		payload.set("category", data.category || extras.category || "undergraduate");
		payload.set("is_application", data.isApplication || extras.isApplication);
		payload.set("source", data.source || extras.source);
		payload.set("approved", data.approved || extras.approved);

		const res = await client.post("project", payload, {
			headers: {
				Authorization: base.authHBasic().Authorization,
			},
			onUploadProgress,
			signal: abortController.signal,
		});
		return res;
	}

	static async upload(fileAndData, extras = {}, onUploadProgress, abortController) {
		if (fileAndData.files[0].contains === fileTypes.all) {
			return await ProjectService.uploadSingle(fileAndData, extras, onUploadProgress, abortController);
		}
	}

	static async getProjectDownloadLink(docId) {
		return await client.get(`project/download/${docId}`, {
			headers: {
				Authorization: base.authHBasic().Authorization,
			},
		});
	}
}
