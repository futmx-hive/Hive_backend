import React from "react";
import HideOnMobile from "@layout/HideOnMobile";
function PoolInfoThead() {
	return (
		<thead className='thead'>
			<tr>
				<th className='weit-3'>id</th>
				<th className='weit-3'>student</th>
				<HideOnMobile>
					<th className='weit-3'>project title</th>
					<th className='weit-3'>submission count</th>
				</HideOnMobile>
				<th className='weit-3'>Status</th>
				<th className='weit-3'></th>
			</tr>
		</thead>
	);
}

export default PoolInfoThead;
