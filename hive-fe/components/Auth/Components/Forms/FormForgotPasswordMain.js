import SingleFormLayout from '../Layout/SingleFormLayout';
import HowToVerifyForm from './Verification/HowToVerifyForm';
import OTPForm from './OTPForm';
import { TabPanel } from '@sharedUi/Tabs';
import UseTabs from '@hooks/UseTabs';
import UseNextPrev from '@hooks/UseNextPrev';
import FormForgotPassword from './FormForgotPassword';

function FormForgotPasswordMain() {
	const [active, setActive] = UseTabs(2);
	const nav = UseNextPrev(setActive);
	return (
		<SingleFormLayout>
			<TabPanel index={0} value={active}>
				<FormForgotPassword next={nav.go(1)} />
			</TabPanel>
			<TabPanel index={1} value={active}>
				<HowToVerifyForm next={nav.go(2)} prev={nav.go(0)} />
			</TabPanel>
			<TabPanel index={2} value={active}>
				<div className='mt-5'>
					<OTPForm prev={nav.go(1)} />
				</div>
			</TabPanel>
		</SingleFormLayout>
	);
}

export default FormForgotPasswordMain;
