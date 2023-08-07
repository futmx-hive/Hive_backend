import ComHome from '@components/commodity/ComHome';
import DashboardLayout from '@layout/DashboardLayout';
import SpaceBottom from '@layout/SpaceBottom';
import TopNav from '@sharedUi/TopNav';
import React from 'react';

function market() {
	return (
		<DashboardLayout>
			<SpaceBottom>
				<TopNav title={'commodities market'} />
				<ComHome />
			</SpaceBottom>
		</DashboardLayout>
	);
}

export default market;
