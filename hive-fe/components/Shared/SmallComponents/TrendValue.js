import React from 'react';

function TrendValue({ value, up = true }) {
	return (
		<>
			<svg className={`tiny_svg  mr-m `}>
				<use xlinkHref='/svg/sprite/sprite.svg#rise'></use>
			</svg>
			<span className='col-gr  heading_tiny'>{value}%</span>
		</>
	);
}

export default TrendValue;
