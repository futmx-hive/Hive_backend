import Card from "@sharedUi/Card";
import React from "react";
import _ from "./style.module.scss";

function TopCommodity({ title, details }) {
	return (
		<Card xtraClassNames={`p-2 ${_.top_comm}`}>
			<div className='flexi sp-btw'>
				<aside className='grid_txt_1'>
					<p className='flexi'>{title}</p>
				</aside>
				<aside>
					<aside className='flexi '>
						<svg className='tiny_svg  mr-m'>
							<use xlinkHref='/svg/sprite/sprite.svg#rise'></use>
						</svg>
						<span className='col-gr'>{(Math.random() * 100).toFixed(2)} %</span>
					</aside>
				</aside>
			</div>
			<p className='heading_avg mt-1 flexi'>
				<span className='mr-m'>₦ 2500</span> <span className='small weit-1'> per unit</span>
			</p>

			<img src='/photos/top_comm_chart.png' alt='simple_img' />
		</Card>
	);
}

export default TopCommodity;
