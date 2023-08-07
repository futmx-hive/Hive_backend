import OtpField from "@form-components/OtpField";
import BackButtonAndText from "@shared/SmallComponents/BackButtonAndText";
import HeadText from "../HeadText";
import UseCountdown from "@hooks/UseTimer";
import { useAuth } from "@components/Auth/context/AuthProvider";
import UseToggle from "@hooks/UseToogle";

function OTPForm({ onSuccess = (data) => null, isSubmitting = false, prev, isLogin = false }) {
	const optResendToog = UseToggle(false);
	const { reset, formattedTime } = UseCountdown(optResendToog.open);
	const { signUp, login, loading } = useAuth();
	const handleResendOTP = async () => {
		reset();
		optResendToog.close();
		await sendOtp();
	};
	const handleSuccess = async (otp) => {
		if (isLogin) {
			return await login(otp);
		}
		return await signUp(otp);
	};
	return (
		<div className='grid_txt_1 '>
			<BackButtonAndText onClick={prev} />
			<OtpField
				header={
					<>
						<HeadText
							h={"enter your security code"}
							p="We sent your code to *****@st.futminna.edu.ng. Don't show anyone"
						/>
					</>
				}
				onSuccess={handleSuccess}
				isSubmitting={loading}
				base={
					<p className='u-center flexi heading_small center-flex gap-15'>
						<span> Didn&apos;t receive code?</span>
						<button
							onClick={handleResendOTP}
							disabled={optResendToog.isOpen || loading}
							className='btn_txt'
						>
							resend in {formattedTime}
						</button>
					</p>
				}
			/>
		</div>
	);
}

export default OTPForm;
