import PasswordField from '@form-components/PasswordField';
import CloseBtn from '@shared/SmallComponents/CloseBtn';
import Icon from '@shared/SmallComponents/Icon';
import Card from '@sharedUi/Card';

import CtaButton from '@sharedUi/CtaButton';

function FormUpdatePassword({ classes = 'modal_w_med', close }) {
	return (
		<Card xtraClassNames={`pos-r p-3 ${classes}`} stop>
			<CloseBtn close={close} />
			<form action='' className='form_pkg'>
				<PasswordField type={'password'} label={'current password'} placeholder={'enter old password'} />
				<PasswordField type={'password'} label={'new password'} placeholder={'enter old password'} />
				<PasswordField
					type={'password'}
					label={'confirm new password'}
					placeholder={'enter old password'}
				/>

				<div className='con_1_1 gap-25'>
					<button className='btn_txt col-p'>cancel</button>
					<CtaButton>save changes</CtaButton>
				</div>
			</form>
		</Card>
	);
}

export default FormUpdatePassword;
