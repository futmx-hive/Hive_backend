import UseTabs from "@hooks/UseTabs";
import { TabBtn, TabDropDown, TabPanel, Tabs } from "@sharedUi/Tabs";
import CtaButton from "@sharedUi/CtaButton";
import _ from "./style.module.scss";
import ListOfBanks from "./ListOfBanks";
import ListOfCards from "./ListOfCards";
import HideOnMobile from "@layout/HideOnMobile";

function BankAndCards() {
	const [active, setActive] = UseTabs(0);
	return (
		<section>
			<div className='sp-btw flexi '>
				<Tabs classes='flex-1 mr-5' value={active} onChange={setActive} max={4} design={"LINE"}>
					<TabBtn>Registered devices</TabBtn>
				</Tabs>
				<HideOnMobile>
					<TabPanel index={0} value={active}>
						<button className='btn_med btn_pri heading_small br-1'>add a device</button>
					</TabPanel>
				</HideOnMobile>
			</div>
			<div className='mt-4'>
				<TabPanel index={0} value={active}>
					<ListOfCards />
				</TabPanel>
				<TabPanel index={1} value={active}>
					<ListOfBanks />
				</TabPanel>
			</div>
		</section>
	);
}

export default BankAndCards;
