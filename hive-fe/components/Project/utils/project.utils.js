import { PROJECT_UPLOAD_STATES } from "../context/ProjectUploadReducer";

const { clone } = require("formconfigs/FormReducer");

export class ProjectUploadUtils {
	static createAborters(idsArray = [], count = 0) {
		const abortersChunk = {};
		for (const id of idsArray) {
			abortersChunk[id] = new AbortController();
		}
		return abortersChunk;
	}

	static createUploadInitialState(filesWithData = []) {
		const singleUpload = {
			uploadProgress: 0,
			state: PROJECT_UPLOAD_STATES.IDLE,
			isvalid: false,
			name: "",
			links: [],
			response: {
				success: false,
				message: "",
			},
		};

		const initialState = {};
		for (const item of filesWithData) {
			initialState[item.id] = {
				...clone(singleUpload),
				isvalid: item.isvalid,
				name: item.name,
				links: item.links || [],
			};
		}
		return initialState;
	}
}
