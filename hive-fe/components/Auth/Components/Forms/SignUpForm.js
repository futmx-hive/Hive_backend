import HeadText from "../HeadText";
import AuthFormMain from "./AuthFormMain";
import { TabBtn, TabDropDown, TabPanel, Tabs } from "@sharedUi/Tabs";
import UseTabs from "@hooks/UseTabs";
import EmailVerification from "./Verification/EmailVerification";
import OTPForm from "./OTPForm";
import UseNextPrev from "@hooks/UseNextPrev";
import FormSecureAccount from "./FormSecureAccount";
import UseForm from "formconfigs/UseForm";

function SignUpForm() {
	const [active, setActive] = UseTabs(0);
	const nav = UseNextPrev(setActive);

	return (
		<>
			<TabPanel index={0} value={active}>
				<AuthFormMain next={nav.go(1)} isLogin={false} />
			</TabPanel>
			<TabPanel index={1} value={active}>
				<div className='mt-5'>
					<OTPForm prev={nav.go(0)} isLogin={false} />
				</div>
			</TabPanel>
		</>
	);
}

export default SignUpForm;
