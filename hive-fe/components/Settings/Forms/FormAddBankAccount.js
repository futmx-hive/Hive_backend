import Field from '@form-components/Field';
import Select from '@form-components/Select2';
import CloseBtn from '@shared/SmallComponents/CloseBtn';
import ModalBackAndText from '@shared/SmallComponents/ModalBackAndText';
import Card from '@sharedUi/Card';

import CtaButton from '@sharedUi/CtaButton';

function FormAddBankAccount({ classes = 'modal_w_med', close }) {
	return (
		<Card xtraClassNames={`pos-r p-3 ${classes}`} stop>
			<CloseBtn close={close} />
			<ModalBackAndText h={'Add Payment method'} />
			<form action='' className='form_pkg'>
				<Select label={'select bank'} placeholder='select bank' />
				<Field label={'bank account number'} placeholder='enter bank account number' />
				<div className='grid mt-2'>
					<CtaButton design='btn_pri tablet'>add bank account</CtaButton>
				</div>
			</form>
		</Card>
	);
}

export default FormAddBankAccount;
