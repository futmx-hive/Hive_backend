import Icon from '@shared/SmallComponents/Icon';
import React from 'react';
import Field from './Field';

function PasswordField({ label, onChange, value, placeholder, supportingText = '' }) {
	const EyeIcon = ({ onClick }) => (
		<Icon
			id={'#eye'}
			// classes='med_svg'
			classes='tiny_svg pos-a'
			style={{
				right: '5%',
				top: '50%',
				transform: 'translateY(-50%)',
			}}
			onClick={onClick}
		/>
	);

	return (
		<Field
			type={'password'}
			label={label}
			placeholder={placeholder}
			supportingContent={<EyeIcon onClick={() => null} />}
			supportingText={supportingText}
		/>
	);
}

export default PasswordField;
