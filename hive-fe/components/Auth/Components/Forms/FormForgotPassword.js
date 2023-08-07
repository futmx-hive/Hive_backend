import Field from '@form-components/Field';
import CtaButton from '@sharedUi/CtaButton';
import Link from 'next/link';
import React from 'react';
import HeadText from '../HeadText';

function FormForgotPassword() {
	return (
		<>
			<HeadText
				h={'forgot password'}
				p='For security purposes, no withdrawals are permitted for 24 hours after password changed.'
			/>
			<form className='form_pkg mt-2'>
				<Field label={'email *'} type='email' placeholder={'elon@tesla.com'} />
				<div className='grid_txt_1 mt-2'>
					<CtaButton>continue</CtaButton>

					<p className='flexi gap-15 heading_small center-flex mt-1'>
						<span>Return to</span>
						<Link href={'/auth/login'}>
							<a className='btn_txt col-pri'>Login</a>
						</Link>
					</p>
				</div>
			</form>
		</>
	);
}

export default FormForgotPassword;
