import BalanceShowcase from "@components/Dashboard/BalanceShowcase";
import TableUserCommodities from "@shared/Tables/TableUserCommodities";
import WrapperTopCommodity from "@components/Dashboard/WrapperTopCommodity";
import RecentTransactions from "@components/Shared/Transaction/RecentTransactions";
import TxQuickActions from "@components/Shared/Transaction/TxQuickActions";
import TopNav from "@components/Shared/UIelements/TopNav";
import DashboardLayout from "@layout/DashboardLayout";
import SpaceBottom from "@layout/SpaceBottom";
import _ from "../components/Dashboard/style.module.scss";

function Dashboard() {
	return (
		<DashboardLayout>
			<SpaceBottom>
				<TopNav title={"dashboard"} />
				{/* <section className='mt-2'>
					<div className={`container-lg con_5_2 ${_.dash_left}`}>
						<BalanceShowcase />
					</div>
					<WrapperTopCommodity />
					<div className={`container-lg con_5_2 ${_.dash_left}`}>
						<TableUserCommodities />
					</div>
				</section> */}
			</SpaceBottom>
		</DashboardLayout>
	);
}

export default Dashboard;
