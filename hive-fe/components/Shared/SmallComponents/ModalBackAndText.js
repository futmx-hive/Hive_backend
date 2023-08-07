import React from 'react';
import Icon from './Icon';

function ModalBackAndText({ h, onClick, showBack = true, classes = '' }) {
	if (!showBack)
		return (
			<div className={`u-center ${classes}`}>
				<h4 className='heading_avg weit-2'>{h}</h4>
			</div>
		);
	return (
		<div className={`flexi sp-btw ${classes}`}>
			<button onClick={onClick}>
				<Icon />
			</button>

			<h4 className='heading_avg weit-2'>{h}</h4>

			<span></span>
		</div>
	);
}

export default ModalBackAndText;
