import React from 'react';
import Icon from './Icon';

const CloseBtn = ({ close, classes = '', iconClasses = '' }) => {
	return (
		<button type='button' className={`small_svg_1 center-flex close_button ${classes}`} onClick={close}>
			<Icon id={'#close'} classes={`small_svg ${iconClasses}`} style={{ fill: '#676767' }} />
		</button>
	);
};

export default CloseBtn;
