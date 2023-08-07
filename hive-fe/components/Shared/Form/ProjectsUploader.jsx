import { DocumentProcessor } from "@utils/index";
import { nestedDocsHandler, singleDocsHandler } from "@utils/services/docsHandler.service";
import React, { useState } from "react";
import { FileUploader } from "./FileUploader";

import ProjectUploadSkin, { getDetailsForUploadType } from "./skins/ProjectUploadSkin";
import UseToggle from "@hooks/UseToogle";

function ProjectsUplooader({ uploadType, handleChange }) {
	const loadToog = UseToggle();
	return (
		<FileUploader
			body={
				<ProjectUploadSkin
					tempLoader={loadToog.isOpen}
					uploadTypeData={getDetailsForUploadType(uploadType)}
				/>
			}
			multiple
			extraInputProps={{ webkitdirectory: "true" }}
			onChange={async (files) => {
				loadToog.open();

				const result = await nestedDocsHandler.preprocessDocs(files);
				console.log({ result });
				const singles = await singleDocsHandler.validateSingles(result.singles);
				const multi = await nestedDocsHandler.validateMulti(result.multi);
				const allFiles = singles.concat(multi);

				handleChange(allFiles);
				loadToog.close();
			}}
			preventDragAndDrop={uploadType === 2}
			disabled={!uploadType}
		></FileUploader>
	);
}

export default ProjectsUplooader;
