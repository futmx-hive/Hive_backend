import ProjectsHome from "@components/Project/pages/ProjectsHome";
import DashboardLayout from "@layout/DashboardLayout";
import SpaceBottom from "@layout/SpaceBottom";
import TopNav from "@sharedUi/TopNav";
import React from "react";

function index() {
	return (
		<DashboardLayout>
			<SpaceBottom>
				<TopNav title={"projects"} />
				<ProjectsHome />
			</SpaceBottom>
		</DashboardLayout>
	);
}

export default index;
