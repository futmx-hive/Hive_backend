import Field from '@form-components/Field';
import CloseBtn from '@shared/SmallComponents/CloseBtn';
import Icon from '@shared/SmallComponents/Icon';
import ModalBackAndText from '@shared/SmallComponents/ModalBackAndText';
import Card from '@sharedUi/Card';

import CtaButton from '@sharedUi/CtaButton';

function FormAddCard({ classes = 'modal_w_med', close }) {
	return (
		<Card xtraClassNames={`pos-r p-3 ${classes}`} stop>
			<CloseBtn close={close} />
			<ModalBackAndText h={'Add Payment method'} />
			<form action='' className='form_pkg'>
				<Field label={'card number'} placeholder='enter card number' />
				<Field label={'card holder name'} placeholder='enter card  holder name' />
				<div className='form_2'>
					<Field label={'expiry date'} placeholder='MM/YY' />
					<Field label={'CVC'} />
				</div>
				<div className='grid mt-2'>
					<CtaButton design='btn_pri tablet'>next</CtaButton>
				</div>
			</form>
		</Card>
	);
}

export default FormAddCard;
