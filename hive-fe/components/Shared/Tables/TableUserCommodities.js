import HideOnMobile from "@layout/HideOnMobile";
import Card from "@sharedUi/Card";
import { useRouter } from "next/router";

function TableUserCommodities() {
	const r = useRouter();
	return (
		<aside>
			<div className='sp-btw mb-2 flexi'>
				<h4 className='heading_small weit-2 cap'>supervisors</h4>

				<button className='btn_med btn_ btn_pri btn_icon tablet' onClick={() => r.push("/roles")}>
					<svg>
						<use xlinkHref='/svg/sprite/sprite.svg#plus'></use>
					</svg>
					<span className='cap'> add new</span>
				</button>
			</div>

			<Card xtraClassNames={"py-2"}>
				<table className='table_t'>
					<thead className='thead'>
						<tr>
							<th className='weit-3'>Name </th>
						</tr>
					</thead>
					<tbody>
						<UserCommodityItem />
						<UserCommodityItem />
						<UserCommodityItem />
						<UserCommodityItem />
					</tbody>
				</table>
			</Card>
		</aside>
	);
}

function UserCommodityItem() {
	return (
		<tr className='pos-r'>
			<td>
				<div className='grid_txt upp'>
					<p>Mr U.C Cosmos</p>
				</div>
			</td>
		</tr>
	);
}

export default TableUserCommodities;
