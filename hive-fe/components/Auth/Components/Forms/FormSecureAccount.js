import PhoneField from '@form-components/PhoneField';
import Select from '@form-components/Select2';
import BackButtonAndText from '@shared/SmallComponents/BackButtonAndText';
import CtaButton from '@sharedUi/CtaButton';
import React from 'react';
import HeadText from '../HeadText';

function FormSecureAccount({ next, prev }) {
	return (
		<>
			<div className='mb-1'>
				<BackButtonAndText onClick={prev} />
			</div>
			<HeadText
				h={'Secure your account'}
				p='To help keep your account safe, we’ll need to verify your number to add another layer of security'
			/>
			<form className='form_pkg'>
				<Select label={'select country'} placeholder='elon@tesla.com' />
				<PhoneField label={'enter phone number'} />
				<div className='mt-1 grid'>
					<CtaButton design='btn_pri tablet'>get OTP</CtaButton>
				</div>
			</form>
		</>
	);
}

export default FormSecureAccount;
