import HideOnMobile from "@layout/HideOnMobile";
import Card from "@sharedUi/Card";
import React from "react";
import _ from "./style.module.scss";
import TopCommodity from "./TopCommodity";
let times = [
	{
		text: "1hr",
		value: 0,
	},
	{
		text: "24hr",
		value: 0,
	},
	{
		text: "1w",
		value: 0,
	},
	{
		text: "1m",
		value: 0,
	},
	{
		text: "3m",
		value: 0,
	},
	{
		text: "1y",
		value: 0,
	},
	{
		text: "all time",
		value: 0,
	},
];

function BalanceShowcase() {
	return <></>;
}
export default BalanceShowcase;

function Times({ times }) {
	return (
		<HideOnMobile>
			<aside className='flexi gap-15'>
				{times.map((t, i) => (
					<span key={i} className={`col-gra-l cap ${i == 4 ? "btn_small_1 btn_green_l tablet" : ""}`}>
						{t.text}
					</span>
				))}
			</aside>
		</HideOnMobile>
	);
}
