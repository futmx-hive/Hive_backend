import React from "react";
import Card from "@shared/SmallComponents/Card";
import Faq from "@sharedUi/FaQ";
import RoleItem from "./RoleItem";
import CheckBox from "@shared/SmallComponents/CheckBox";

function RoleDisplay({ title = "Admins" }) {
	const comp = (title = "", count = 2) => (
		<div className='flex-1 flexi sp-btw '>
			<div className='flexi gap-25'>
				<CheckBox />
				<h2 className='heading_avg cap weit-2 col-col-gra-bt-d'>{title}</h2>
			</div>
			<span className='heading_med weit-3'>({count})</span>
		</div>
	);
	return (
		<Card classes={"bord-g-1"}>
			<Faq Component={comp(title, 2)}>
				<RoleItem />
				<RoleItem />
				<RoleItem />
			</Faq>
		</Card>
	);
}

export default RoleDisplay;
