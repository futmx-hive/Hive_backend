import UseToggle from '@hooks/UseToogle';
import React from 'react';
import _ from '../forms.module.scss';

const config = {
	email(text = 'el••••••@gmail.com') {
		return `Get the code by email at ${text}`;
	},
	phone(text = '+1 234 567 890') {
		return `Get the code by text message at ${text}`;
	},
};

function VerifyRadioInput({ type, id = 'j' }) {
	const toog = UseToggle();
	return (
		<label htmlFor={id} className={`grid_max_1 gap-25 br-1 ${_.ver_radio}`}>
			<input type='radio' name='choose' id={id} onChange={toog.toogle} />

			<div className='round pos-r'></div>

			<p className='heading_small'>{config[type]()}</p>
		</label>
	);
}

export default VerifyRadioInput;
