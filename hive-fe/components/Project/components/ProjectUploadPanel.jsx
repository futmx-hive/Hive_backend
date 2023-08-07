import React, { useState } from "react";
import ProjectUploadPaneltem from "./ProjectUploadPaneltem";
import { DUMMY_SINGLE_UPLOAD_STATE, useProjectUploadContext } from "../context/ProjectsUploadProvider";
import ProjectItem from "@components/search/projects/components/ProjectItem";
import Card from "@sharedUi/Card";
import _ from "./styles.module.scss";
function ProjectUploadPanel({ projects, panelTitle }) {
	const { uploadingFilesState } = useProjectUploadContext();
	return (
		<aside className=''>
			<h3 className='heading_med upp weit-2 mb-2'>
				{panelTitle}&nbsp;
				<span className='weit-3'>({projects.length})</span>
			</h3>
			<div className='flex-col gap-2 '>
				{projects.map((element, index) => {
					if (!element.id) return null;
					const fileUploadState = uploadingFilesState[element.id]
						? uploadingFilesState[element.id]
						: DUMMY_SINGLE_UPLOAD_STATE.response;
					const { success, data, message } = fileUploadState.response;
					{
						/* console.log({ res: fileUploadState.response }); */
					}
					return (
						<div key={element.id} className={`mb-5`}>
							<ProjectUploadPaneltem
								files={element.files}
								type={element.type}
								name={element.name}
								isValid={element.isvalid}
								id={element.id}
								element={element}
								hasErrored={!success}
								errorMessage={!success ? message : ""}
								errorData={!success ? data : null}
							/>
							{success && (
								<Card xtraClassNames={"p-3 mt-4 pos-r"}>
									{success && <div className={`${_.sep} pos-a br`}></div>}
									<ProjectItem hit={data} />
								</Card>
							)}
						</div>
					);
				})}
			</div>
		</aside>
	);
}

export default ProjectUploadPanel;
