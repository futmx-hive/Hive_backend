import React from "react";
import EntityCard from "@sharedUi/StudentCard";
import Icon from "@shared/SmallComponents/Icon";
import CheckBox from "@shared/SmallComponents/CheckBox";
function RoleItem() {
	return (
		<aside className='bord-bott-1 sp-btw p-y-1'>
			<div className='flexi gap-25'>
				<CheckBox name={Math.random().toString()} on={false} />
				<EntityCard />
			</div>
			<div className='flexi'>
				<button className='btn_icon btn_med col-r tablet btn_bord'>
					<Icon id={"#bin"} style={{ stroke: "red" }} />
				</button>
			</div>
		</aside>
	);
}

export default RoleItem;
