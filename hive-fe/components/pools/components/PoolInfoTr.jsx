import HideOnMobile from "@layout/HideOnMobile";
import { useRouter } from "next/router";
import React from "react";

function PoolInfoTr() {
	const router = useRouter();
	return (
		<tr className='pos-r'>
			<td>
				<span className='cap'>01</span>
			</td>
			<td>
				<span className='col-gra-d heading_small cap no-wrap'>Maryam mahmud</span>
			</td>
			<HideOnMobile>
				<td>
					<div className='grid_txt cap heading_small col-col-gra-bt-d'>
						<p>Design and Implementation of a student allocation and project monitoring system </p>
					</div>
				</td>
				<td>
					<span>3</span>
				</td>
			</HideOnMobile>

			<td>
				<span className='badge_bg badge_gr upp'> active</span>
			</td>
			<td className='col-pri'>
				<button className='btn_small btn_bord col-pri  weit-1 br' onClick={() => router.push("/projects")}>
					{" "}
					view
				</button>
			</td>
		</tr>
	);
}

export default PoolInfoTr;
