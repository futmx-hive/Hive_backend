import { TabBtn, TabPanel, Tabs } from "@sharedUi/Tabs";
import Card from "@sharedUi/Card";
import UseTabs from "@hooks/UseTabs";
import TheadTx from "./TheadTx";
import TrowTx from "./TrowTx";
import _ from "./style.module.scss";
import Link from "next/link";

function TxHome() {
	const [active, setActive] = UseTabs(0);
	return (
		<section className={`${_.tx_sec}`}>
			<div className='container-lg'>
				<Card xtraClassNames={"grid_txt_2 p-"}>
					<div className='sp-btw flexi p-x-2 pt-2'>
						<Link href={"/pools/create"}>
							<a className='btn_large btn_pri tablet'>create pool</a>
						</Link>
					</div>
					<table className='table_t mt-2'>
						<TheadTx />
						<tbody>
							<TrowTx />
							<TrowTx />
							<TrowTx />
						</tbody>
					</table>
				</Card>
			</div>
		</section>
	);
}

export default TxHome;
