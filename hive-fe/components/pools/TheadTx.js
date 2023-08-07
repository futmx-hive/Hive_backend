import HideOnMobile from "@layout/HideOnMobile";
import React from "react";

function TheadTx() {
	return (
		<thead className='thead'>
			<tr>
				<th className='weit-3'>date</th>
				<th className='weit-3'>students</th>
				<HideOnMobile>
					<th className='weit-3'>supervisors</th>

					<th className='weit-3'>submissions{`(max)`}</th>
					<th className='weit-3'>number of submissions</th>
				</HideOnMobile>
				<th className='weit-3'>Status</th>
			</tr>
		</thead>
	);
}

export default TheadTx;
