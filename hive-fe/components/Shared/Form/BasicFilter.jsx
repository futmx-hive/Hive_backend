import { years } from "@utils/index";
import React from "react";
import Select2 from "@form-components/Select2";
const studentsType = [
	{
		label: "undergraduate",
		value: "undergraduate",
	},
	{
		label: "masters",
		value: "masters",
	},
	{
		label: "phd",
		value: "phd",
	},
];

function BasicFilter({ btnText = "display" }) {
	return (
		<aside className='flexi gap-25 mb-5 filter_select'>
			<Select2 options={years} placeholder='year' />
			<Select2 options={studentsType} placeholder='students type' />
			<div className=''>
				<button className='btn_large btn_pri  weit-1 tablet'>{btnText}</button>
			</div>
		</aside>
	);
}

export default BasicFilter;
