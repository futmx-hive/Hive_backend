import SingleComodityDetails from '@components/commodity/SingleComodityDetails';
import DashboardLayout from '@layout/DashboardLayout';
import SpaceBottom from '@layout/SpaceBottom';
import TopNav from '@sharedUi/TopNav';
import React from 'react';

function market() {
	return (
		<DashboardLayout>
			<SpaceBottom>
				<TopNav title={'commodities market'} />
				<SingleComodityDetails />
			</SpaceBottom>
		</DashboardLayout>
	);
}

export default market;
