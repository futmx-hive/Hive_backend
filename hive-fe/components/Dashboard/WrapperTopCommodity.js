import React from 'react';
import TopCommodity from './TopCommodity';
import _ from './style.module.scss';

function WrapperTopCommodity() {
	return (
		<section className={`${_.comm} grid_txt`}>
			<div className='container-lg'>
				<h2 className='heading_avg cap mb-2'>top commmodities</h2>
			</div>
			<div className='container-lg'>
				<div className='div_4'>
					<TopCommodity />
					<TopCommodity />
					<TopCommodity />
					<TopCommodity />
				</div>
			</div>
		</section>
	);
}

export default WrapperTopCommodity;
