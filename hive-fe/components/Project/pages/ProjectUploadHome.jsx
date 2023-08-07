import ProjectsUploader from "@form-components/ProjectsUploader";
import Card from "@sharedUi/Card";
import Select2 from "@form-components/Select2";
import React from "react";
import ProjectUploadPanel from "../components/ProjectUploadPanel";
import ProjectUploadOptions from "../components/ProjectUploadOptions";
import { useProjectUploadContext } from "../context/ProjectsUploadProvider";

const options = [
	{
		label: "plain word documents",
		value: 1,
	},
	{
		label: "nested folder structure",
		value: 2,
	},
];

function ProjectUploadHome() {
	const { filesToBeUploaded, processFiles, handleBulkUpload, availableFiles, uploadType, setUploadType, loadToog } =
		useProjectUploadContext();

	return (
		<>
			{!availableFiles() ? (
				<>
					<section className='bord-bott-1 p-y-3 bg-w'>
						<div className='container-lg'>
							<aside className='al-end flex'>
								<h2 className='heading_med_2 col-bl flex-3'> upload projects </h2>
								<div>
									<div className='flexi gap-15'>
										<Select2
											name={"uploadType"}
											value={uploadType}
											placeholder={"select upload type"}
											options={options}
											handleChange={({ payload, name }) => {
												setUploadType({ ...options[payload - 1] });
											}}
										/>
									</div>
								</div>
							</aside>
						</div>
					</section>
					<section className='mt-4'>
						<div className='container-lg '>
							<Card xtraClassNames={"no_bord "}>
								<ProjectsUploader
									uploadType={uploadType && uploadType.value}
									handleChange={processFiles}
								/>
							</Card>
						</div>
					</section>
				</>
			) : (
				<section className='mt-3'>
					<div className='container-lg  pos-r'>
						<div className='con_5_2 pos-r al-start'>
							<div className='mb-4'>
								{availableFiles && (
									<ProjectUploadPanel projects={filesToBeUploaded} panelTitle={"Files"} />
								)}
							</div>
							<ProjectUploadOptions handleUpload={handleBulkUpload} loading={loadToog.isOpen} />
						</div>
					</div>
				</section>
			)}
		</>
	);
}

export default ProjectUploadHome;
