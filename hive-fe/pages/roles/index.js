import RolesHome from "@components/roles/pages/RolesHome";
import DashboardLayout from "@layout/DashboardLayout";
import SpaceBottom from "@layout/SpaceBottom";
import TopNav from "@sharedUi/TopNav";
import React from "react";

function Roles() {
	return (
		<DashboardLayout>
			<SpaceBottom>
				<TopNav title={"Manage Access"} />
				<RolesHome />
			</SpaceBottom>
		</DashboardLayout>
	);
}

export default Roles;
