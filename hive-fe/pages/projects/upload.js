import ProjectUploadHome from "@components/Project/pages/ProjectUploadHome";
import DashboardLayout from "@layout/DashboardLayout";
import SpaceBottom from "@layout/SpaceBottom";
import SearchBox from "@sharedUi/SearchBox";
import TopNav from "@sharedUi/TopNav";
import React from "react";

function upload() {
	return (
		<DashboardLayout>
			<SpaceBottom>
				<TopNav left={<SearchBox placeholder={"search for projects"} />} />
				<ProjectUploadHome />
			</SpaceBottom>
		</DashboardLayout>
	);
}

export default upload;
