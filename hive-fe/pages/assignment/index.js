import AssigneeHome from "@components/accessments/AssigneeHome";
import DashboardLayout from "@layout/DashboardLayout";
import SpaceBottom from "@layout/SpaceBottom";
import TopNav from "@sharedUi/TopNav";
import React from "react";

function Accessment() {
	return (
		<DashboardLayout>
			<SpaceBottom>
				<TopNav title={"Project Accessments"} />
				<AssigneeHome />
			</SpaceBottom>
		</DashboardLayout>
	);
}

export default Accessment;
