import BackButtonAndText from '@shared/SmallComponents/BackButtonAndText';
import Icon from '@shared/SmallComponents/Icon';
import React from 'react';
import HeadText from '../../HeadText';

function EmailVerification({ prev, next }) {
	return (
		<>
			<div className='mb-1'>
				<BackButtonAndText onClick={prev} />
			</div>
			<div className='grid_txt_2'>
				<div className='u-center'>
					<Icon id={'#mail'} classes='lag_svg' />
				</div>
				<HeadText
					h={'verify your email address'}
					p='We’ve sent a verificaion mail to elon@tesla.com. Click on the confirmation button to continue!'
				/>
				<div className='bord-bott-1'></div>
				<div className='u-center grid_txt_2 center-grid'>
					<p className='flexi gap-15'>
						<span>didnt receive an email?</span>
						<button className='btn_txt heading_tiny'>resend</button>
					</p>

					<button className='btn_txt heading_tiny' onClick={next}>
						change email
					</button>
				</div>
			</div>
		</>
	);
}

export default EmailVerification;
