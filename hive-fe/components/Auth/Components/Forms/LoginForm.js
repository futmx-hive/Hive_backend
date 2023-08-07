import HeadText from "../HeadText";
import AuthFormMain from "./AuthFormMain";
import { TabPanel } from "@sharedUi/Tabs";
import UseTabs from "@hooks/UseTabs";
import OTPForm from "./OTPForm";
import UseNextPrev from "@hooks/UseNextPrev";

function LoginForm() {
	const [active, setActive] = UseTabs(0);
	const nav = UseNextPrev(setActive);
	return (
		<>
			<TabPanel index={0} value={active}>
				<AuthFormMain next={nav.go(1)} heading={<HeadText h='welcome back !' />} isLogin />
			</TabPanel>
			<TabPanel index={1} value={active}>
				<div className='mt-5'>
					<OTPForm prev={nav.go(0)} isLogin />
				</div>
			</TabPanel>
		</>
	);
}

export default LoginForm;
