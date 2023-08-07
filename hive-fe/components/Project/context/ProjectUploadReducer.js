import { clone } from "formconfigs/FormReducer";
import { initialState } from "./ProjectsUploadProvider";
export const PROJECT_UPLOAD_ACTIONS = {
	INITIALIZE_STATE: "i_s",
	UPDATE_SINGLE_FILE_ACTIVITY: "u_s_f_s",
	UPDATE_SINGLE_FILE_UPLOAD_PROGRESS: "u_s_f_u_p",
	CLEAR_FILES: "clear_files",
	DELETE_SINGLE_FILE: "delete_single_file",
	SET_RESPONSES: "s_r",
};

export const PROJECT_UPLOAD_STATES = {
	IDLE: "IDLE",
	LOADING: "LOADING",
	SUCCESS: "SUCCESS",
	FAILED: "FAILED",
	ABORTED: "ABORTED",
};

export function ProjectUploadReducer(state, action) {
	const clonedState = clone(state);
	switch (action.type) {
		case PROJECT_UPLOAD_ACTIONS.SET_RESPONSES: {
			const responses = action.payload;
			for (const response of responses) {
				clonedState[response.id].response = {
					...clonedState[response.id].response,
					success: response.success,
					message: response.message,
					data: response.data,
				};
			}
			return clonedState;
		}

		case PROJECT_UPLOAD_ACTIONS.INITIALIZE_STATE: {
			return action.payload;
		}
		case PROJECT_UPLOAD_ACTIONS.UPDATE_SINGLE_FILE_ACTIVITY: {
			const { id, ...rest } = action.payload;
			clonedState[id] = { ...clonedState[id], ...rest };

			return clonedState;
		}

		case PROJECT_UPLOAD_ACTIONS.UPDATE_SINGLE_FILE_UPLOAD_PROGRESS: {
			const { id, value } = action.payload;
			clonedState[id].uploadProgress = value;
			return clonedState;
		}

		case PROJECT_UPLOAD_ACTIONS.DELETE_SINGLE_FILE: {
			const { id } = action.payload;
			Reflect.deleteProperty(clonedState, id);
			return clonedState;
		}
		case PROJECT_UPLOAD_ACTIONS.CLEAR_FILES: {
			return initialState;
		}

		case PROJECT_UPLOAD_ACTIONS.DELETE_SINGLE_FILE:

		default:
			return state;
	}
}
