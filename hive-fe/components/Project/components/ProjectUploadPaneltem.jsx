import AddLinks, { linkSchema2 } from "@form-components/AddLinks";
import Icon from "@shared/SmallComponents/Icon";
import Card from "@sharedUi/Card";
import Faq from "@sharedUi/FaQ";
import { DocumentProcessor } from "@utils/index";
import React from "react";
import { useProjectUploadContext } from "../context/ProjectsUploadProvider";
import LinkBox from "@shared/SmallComponents/LinkBox";
import { PROJECT_UPLOAD_STATES } from "../context/ProjectUploadReducer";

function ProjectUploadPaneltem({ files = [], name = "", isValid, id, element, errorMessage, errorData, hasErrored }) {
	const { addRepoLink, deleteRepoLink, uploadingFilesState, loadToog, handleTerminateDownload, doSingleFileUpload } =
		useProjectUploadContext();
	const isRetry = true;

	const hasIssues = (uploadingFilesState[id].state === PROJECT_UPLOAD_STATES.FAILED && hasErrored) || !isValid;
	const header = (
		<div className='flex-1 flexi sp-btw '>
			<h2 className='heading_med cap weit-2 col-gra-bt-d'>{name}</h2>
			<div className='flexi gap-25'>
				{uploadingFilesState[id].state === PROJECT_UPLOAD_STATES.LOADING && (
					<button
						className='btn_icon btn_small col-r tablet btn_bord mr-3'
						onClick={() => handleTerminateDownload(id)}
					>
						<span>abort </span>
						<Icon id={"#bin"} style={{ stroke: "red" }} />
					</button>
				)}
				{(uploadingFilesState[id].state === PROJECT_UPLOAD_STATES.ABORTED ||
					uploadingFilesState[id].state === PROJECT_UPLOAD_STATES.FAILED) && (
					<button
						className='btn_icon btn_small col-pri tablet btn_bord mr-3'
						onClick={() => doSingleFileUpload(element, isRetry)}
					>
						<span>retry </span>
						<Icon id={"#retry"} style={{ stroke: "red" }} />
					</button>
				)}
				{loadToog.isOpen && <span className='badge_bg badge_gr upp'> uploading</span>}
			</div>
		</div>
	);
	return (
		<div>
			<Card xtraClassNames={`pos-r ${!hasIssues ? "" : "bord-r-1"} `}>
				<div
					className='progress pos-a'
					style={{
						width: uploadingFilesState[id].uploadProgress + "%",
						transition: ".3s",
						top: 0,
						left: 0,
						height: "5px",

						backgroundImage: hasIssues
							? "linear-gradient(90deg,#dc2626, #f87171, #b91c1c"
							: "linear-gradient(90deg,hsl(149, 100%, 40%) , #50FF12, hsl(149, 100%, 40%))",
					}}
				></div>
				<Faq Component={header} locked={name === DocumentProcessor.projectTypes.SINGLE} initialIsOpen>
					{files.map((file, index) => (
						<SingleFileDisplay key={index} fileName={file.file.name} type={file.contains} />
					))}
					{isValid && (
						<div className='pb-3'>
							<div className='grid_txt_2 mb-2'>
								{uploadingFilesState[id] &&
									uploadingFilesState[id].links.map((link, index) => (
										<LinkBox
											key={id + index}
											link={link}
											handleDelete={() => deleteRepoLink(id, index)}
										/>
									))}
							</div>
							{uploadingFilesState[id]?.links?.length < 2 && (
								<AddLinks
									placeholder='(optional) add  github or gitlab links to public remote code repo'
									buttonText='add repo'
									onAdd={(value) => {
										addRepoLink(id, value);
									}}
									schema={linkSchema2}
								/>
							)}
						</div>
					)}
				</Faq>
				{!isValid ? (
					<div className='bg-r col-w p-2'>
						<p>files are incomplete</p>
					</div>
				) : null}

				{uploadingFilesState[id].state === PROJECT_UPLOAD_STATES.FAILED && hasErrored ? (
					<div className='bg-r col-w p-2'>
						<p>{errorMessage}</p>
					</div>
				) : null}
			</Card>
		</div>
	);
}

export default ProjectUploadPaneltem;

function SingleFileDisplay({ fileName, type }) {
	return (
		<aside className='sp-btw p-y-2 bg bord-bott-1 '>
			<div className='flexi gap-15'>
				<h6 className='heading_med col-gra-d'>{fileName}</h6>
				<span className='upp col-gr heading_med '>
					{"<<"}
					{type}
					{">>"}
				</span>
			</div>
		</aside>
	);
}
