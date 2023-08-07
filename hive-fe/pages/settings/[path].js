import SettingsHome from '@components/Settings/SettingsHome';
import DashboardLayout from '@layout/DashboardLayout';
import SpaceBottom from '@layout/SpaceBottom';
import TopNav from '@sharedUi/TopNav';
import { useRouter } from 'next/router';
import React from 'react';

const paths = ['profile', 'cards', 'preferences'];

function Settings() {
	const Router = useRouter();
	const index = paths.findIndex((p) => new RegExp(Router.query.path).test(p));

	if (!Router.isReady) {
		return <h1>loading...</h1>;
	}
	return (
		<DashboardLayout>
			<SpaceBottom>
				<TopNav title={'settings'} />
				<SettingsHome index={index} tabspathData={paths.map((p) => 'settings/' + p)} />
			</SpaceBottom>
		</DashboardLayout>
	);
}

export default Settings;
