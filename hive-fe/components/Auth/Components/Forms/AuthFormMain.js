import HeadText from "../HeadText";
import FormAuth from "./FormAuth";
import FormOAuth from "./FormOAuth";

function AuthFormMain({ heading = <HeadText h={"create your account"} />, isLogin, next = () => null }) {
	return (
		<div className='grid_txt_1'>
			{heading}
			<FormAuth isLogin={isLogin} next={next} />
		</div>
	);
}

export default AuthFormMain;
