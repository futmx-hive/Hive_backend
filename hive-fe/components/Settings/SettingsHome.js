import UseTabs from "@hooks/UseTabs";
import { TabBtn, TabDropDown, TabPanel, Tabs } from "@sharedUi/Tabs";
import Card from "@sharedUi/Card";
import _ from "./style.module.scss";
import FormProfile from "./Forms/FormProfile";
import BankAndCards from "./BankAndCards";
import { useEffect } from "react";
import Preferences from "./Preferences";

const tabNames = ["profile", "devices", "preferences"];

function SettingsHome({ index, tabspathData }) {
	const [active, setActive] = UseTabs(index);
	useEffect(() => setActive(index), [index, setActive]);
	return (
		<section className={`${_.settings}`}>
			<div className='container-lg'>
				<Card>
					<Tabs classes='' value={active} onChange={setActive} max={4}>
						{tabNames.map((e, i) => (
							<TabBtn link={`${tabspathData[i]}`} key={i}>
								{e}{" "}
							</TabBtn>
						))}
					</Tabs>
					<div className={`${_.settings_con}`}>
						<TabPanel index={0} value={active}>
							<FormProfile />
						</TabPanel>
						<TabPanel index={1} value={active}>
							<BankAndCards />
						</TabPanel>
						<TabPanel index={2} value={active}>
							<Preferences />
						</TabPanel>
					</div>
				</Card>
			</div>
		</section>
	);
}

export default SettingsHome;
