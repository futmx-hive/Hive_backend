import useMyToast from "@shared/Toast/useMyToast";
import { AuthService } from "./auth.service";
import { useMutation } from "@tanstack/react-query";

export const UseSendOtp = () => {
	const { addToast } = useMyToast();
	return useMutation(AuthService.sendOTP, {
		onError() {
			addToast({
				text: `an error occured please try again`,
				type: "error",
				isTop: true,
			});
		},
		onSuccess(_, data) {
			addToast({
				text: `OTP sent successfully to ${data}`,
				isTop: true,
			});
		},
	});
};
export const UseSignIn = () => {
	const { addToast } = useMyToast();
	return useMutation(AuthService.signupOTP, {
		onError() {
			addToast({
				text: `authentication failed`,
				type: "error",
				isTop: true,
			});
		},
		onSuccess(_, data) {
			addToast({
				text: `authenticated successfully`,
				isTop: true,
			});
		},
	});
};
export const UseLoginOtp = () => {
	const { addToast } = useMyToast();
	return useMutation(AuthService.loginOTP, {
		onError() {
			addToast({
				text: `authentication failed`,
				type: "error",
				isTop: true,
			});
		},
		onSuccess(_, data) {
			addToast({
				text: `authenticated successfully`,
				isTop: true,
			});
		},
	});
};
