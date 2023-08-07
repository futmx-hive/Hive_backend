import BackButtonAndText from '@shared/SmallComponents/BackButtonAndText';
import CtaButton from '@sharedUi/CtaButton';
import HeadText from '../../HeadText';
import _ from '../forms.module.scss';
import VerifyRadioInput from './VerifyRadioInput';

function HowToVerifyForm({ next, prev }) {
	return (
		<>
			<div className='mb-1'>
				<BackButtonAndText onClick={prev} />
			</div>
			<HeadText
				h={'Verifying your account'}
				p={
					<>
						{' '}
						<span> Help us secure your account.</span>
						<span>Please complete the verifications below</span>
					</>
				}
			/>
			<div className={`mt-5  grid_txt_2`}>
				<h5 className='heading_avg weit-1'>select ways to verify</h5>
				<div className='grid_txt_2'>
					<VerifyRadioInput type={'phone'} />
					<VerifyRadioInput type={'email'} id={'k'} />
				</div>
			</div>
			<div className='mt-3 grid'>
				<CtaButton design='btn_pri tablet' onClick={next}>
					continue
				</CtaButton>
			</div>
		</>
	);
}

export default HowToVerifyForm;
