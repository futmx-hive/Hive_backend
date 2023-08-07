import TxHome from "@components/pools/PoolHome";
import FormSubmission from "@components/submission/components/FormSubmission";
import DashboardLayout from "@layout/DashboardLayout";
import SpaceBottom from "@layout/SpaceBottom";
import TopNav from "@sharedUi/TopNav";
import React from "react";

function create() {
	return (
		<DashboardLayout>
			<SpaceBottom>
				<TopNav title={"create submission"} />
				<FormSubmission />
			</SpaceBottom>
		</DashboardLayout>
	);
}

export default create;
