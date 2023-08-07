import UseToggle from "@hooks/UseToogle";

import React, { createContext, useContext, useReducer, useRef, useState } from "react";
import { PROJECT_UPLOAD_ACTIONS, PROJECT_UPLOAD_STATES, ProjectUploadReducer } from "./ProjectUploadReducer";
import { ProjectUploadUtils } from "../utils/project.utils";
import { ProjectService } from "../services/project.services";
import UseForm from "formconfigs/UseForm";
import { projectTypes, uploadOptionsSchema } from "../models/schema";

export const ProjectUploadContext = createContext();
export const useProjectUploadContext = () => useContext(ProjectUploadContext);

const singleUpload = {
	uploadProgress: 0,
	state: PROJECT_UPLOAD_STATES.IDLE,
	name: "",
	isvalid: false,
	links: [],
	response: {
		success: false,
		message: "",
		data: null,
	},
};

export const DUMMY_SINGLE_UPLOAD_STATE = singleUpload;
export const initialState = {};
const initialFormState = {
	fields: {
		category: 1,
		approve_all: true,
	},
};
export default function ProjectsUploadProvider({ children }) {
	const projectUploadFormChunk = UseForm(initialFormState, uploadOptionsSchema);
	const loadToog = UseToggle(false);
	const [uploadType, setUploadType] = useState(null);
	const [state, dispatch] = useReducer(ProjectUploadReducer, initialState);
	const aborters = useRef({});
	const [filesToBeUploaded, setFilesToBeUploaded] = useState([]);

	const availableFiles = () => filesToBeUploaded.length;
	const initialize = (initialState) =>
		dispatch({
			type: PROJECT_UPLOAD_ACTIONS.INITIALIZE_STATE,
			payload: initialState,
		});
	const processFiles = (filesWithData) => {
		setFilesToBeUploaded(filesWithData);
		const initialAborters = ProjectUploadUtils.createAborters(filesWithData.map((e) => e.id));
		const initialState = ProjectUploadUtils.createUploadInitialState(filesWithData);
		initialize(initialState);
		aborters.current.value = initialAborters;
	};

	const addRepoLink = (id, link) => {
		const { links } = state[id];
		let newLinks = [...links, link];

		dispatch({
			type: PROJECT_UPLOAD_ACTIONS.UPDATE_SINGLE_FILE_ACTIVITY,
			payload: {
				id,
				links: newLinks,
			},
		});
	};
	const deleteRepoLink = (id, index) => {
		const { links } = state[id];
		let newLinks = [...links].filter((_, i) => i !== index);

		dispatch({
			type: PROJECT_UPLOAD_ACTIONS.UPDATE_SINGLE_FILE_ACTIVITY,
			payload: {
				id,
				links: newLinks,
			},
		});
	};
	const updateUploadProgress = (id, value) => {
		dispatch({
			type: PROJECT_UPLOAD_ACTIONS.UPDATE_SINGLE_FILE_ACTIVITY,
			payload: {
				id,
				uploadProgress: value,
			},
		});
	};

	const changeUploadState = (id, state) => {
		return dispatch({
			type: PROJECT_UPLOAD_ACTIONS.UPDATE_SINGLE_FILE_ACTIVITY,
			payload: {
				id,
				state,
			},
		});
	};
	const handleTerminateDownload = (id) => {
		const signal = aborters.current.value[id];

		if (signal) {
			signal.abort();
			changeUploadState(id, PROJECT_UPLOAD_STATES.ABORTED);
		}
	};

	const doSingleFileUpload = async (f, isRetry = false) => {
		if (isRetry) {
			aborters.current.value[f.id] = new AbortController();
		}
		try {
			changeUploadState(f.id, PROJECT_UPLOAD_STATES.LOADING);
			const res = await ProjectService.upload(
				f,
				{
					category: projectTypes[projectUploadFormChunk.values["category"]],
					approved: projectUploadFormChunk.values["approve_all"],
					source: state[f.id].links ? state[f.id].links.join(",") : "",
					isApplication: !!state[f.id].links.length,
				},
				(v) => updateUploadProgress(f.id, (v.loaded / v.total) * 100),
				aborters.current.value[f.id],
			);
			changeUploadState(f.id, PROJECT_UPLOAD_STATES.SUCCESS);
			console.log({ singleFileRes: res });

			dispatch({
				type: PROJECT_UPLOAD_ACTIONS.SET_RESPONSES,
				payload: [
					{
						id: f.id,
						success: true,
						message: res.data.message,
						data: res.data.data,
					},
				],
			});

			return Promise.resolve({
				id: f.id,
				...res.data,
			});
		} catch (error) {
			changeUploadState(f.id, PROJECT_UPLOAD_STATES.FAILED);
			// console.log({ error });
			dispatch({
				type: PROJECT_UPLOAD_ACTIONS.SET_RESPONSES,
				payload: [
					{
						id: f.id,
						success: false,
						message: error?.response?.data?.message || "uplooad failed",
						data: error?.response?.data,
					},
				],
			});

			return Promise.resolve({
				id: f.id,
				...error,
			});
		}
	};

	const handleBulkUpload = async () => {
		loadToog.open();

		const awaiting = filesToBeUploaded.filter((f) => {
			if (f.isvalid) {
				// console.log(f);
			}
			return f.isvalid;
		});

		const responses = await Promise.all(awaiting.map(doSingleFileUpload));
		// console.log({ responses });
		// dispatch({
		// 	type: PROJECT_UPLOAD_ACTIONS.SET_RESPONSES,
		// 	payload: responses.map((res) => ({
		// 		...res,
		// 		message: !res.success ? res.message : "",
		// 	})),
		// });
		loadToog.close();
	};

	const haandleReset = () => {
		if (!loadToog.isOpen) {
			aborters.current.value = {};
			setFilesToBeUploaded([]);
			initialize({});
		}
	};

	return (
		<ProjectUploadContext.Provider
			value={{
				filesToBeUploaded,
				processFiles,
				handleBulkUpload,
				availableFiles,
				uploadType,
				setUploadType,
				loadToog,
				projectUploadFormChunk,
				addRepoLink,
				deleteRepoLink,
				uploadingFilesState: state,
				handleTerminateDownload,
				doSingleFileUpload,
				haandleReset,
			}}
		>
			{children}
		</ProjectUploadContext.Provider>
	);
}
