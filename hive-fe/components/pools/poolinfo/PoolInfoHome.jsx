import BackButtonAndText from "@shared/SmallComponents/BackButtonAndText";
import Card from "@sharedUi/Card";
import SearchBox from "@sharedUi/SearchBox";
import { useRouter } from "next/router";
import React from "react";
import PoolInfoThead from "../components/PoolInfoThead";
import PoolInfoTr from "../components/PoolInfoTr";

function PoolInfoHome() {
	const router = useRouter();
	return (
		<section>
			<div className='container'>
				<aside className='grid_txt_2'>
					<BackButtonAndText />
					<div className={"p-y-2 mb-2"}>
						<div className='sp-btw flexi gap-25'>
							<SearchBox placeholder={"search student"} full />
							<div className='con_1_1 gap-15'>
								<button
									className='btn_large btn_pri  weit-1 tablet'
									onClick={() => router.push("/pools/update/3454")}
								>
									edit pool
								</button>
								<button className='btn_large btn_bord  weit-1 tablet col-r bg-w'>
									delete pool
								</button>
							</div>
						</div>
					</div>
				</aside>
			</div>
			<div className='container'>
				<Card xtraClassNames={"p-x-2"}>
					<table>
						<PoolInfoThead />
						<PoolInfoTr />
						<PoolInfoTr />
						<PoolInfoTr />
						<PoolInfoTr />
					</table>
				</Card>
			</div>
		</section>
	);
}

export default PoolInfoHome;
