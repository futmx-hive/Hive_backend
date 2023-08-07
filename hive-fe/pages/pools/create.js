import CrudPool from "@components/pools/forms/CuPool";
import DashboardLayout from "@layout/DashboardLayout";
import SpaceBottom from "@layout/SpaceBottom";

import React from "react";

function create() {
	return (
		<DashboardLayout>
			<SpaceBottom>
				<CrudPool />
			</SpaceBottom>
		</DashboardLayout>
	);
}

export default create;
