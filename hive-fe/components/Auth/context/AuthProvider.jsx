import { createContext, useState, useContext } from "react";
import { useRouter } from "next/router";
import { EmailPasswordlessSchema } from "@components/Auth/models/authSchema";
import UseForm from "formconfigs/UseForm";
import { UseLoginOtp, UseSendOtp, UseSignIn } from "../services/auth.queries";
import StorageService, { SPECIAL_KEY_NAMES } from "services/localStore";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);
const initialState = {
	fields: {
		email: "",
	},
};

export const AUTH_STATUSES = {
	AUTHENTICATED: "authenticated",
	UNAUTHENTICATED: "unauthenticated",
	LOADING: "loading",
};
const AuthProvider = ({ children }) => {
	const chunk = UseForm(initialState, EmailPasswordlessSchema);
	const [status, setStatus] = useState(AUTH_STATUSES.LOADING);
	const [otpToken, setOtpToken] = useState("");
	const [user, setUser] = useState(null);
	const sendOtpM = UseSendOtp();
	const signinM = UseSignIn();
	const loginM = UseLoginOtp();
	const router = useRouter();

	const handleAuthSuccess = (token, userData) => {
		setUser(userData);
		StorageService.setKey(SPECIAL_KEY_NAMES.TOKEN, token);
		setStatus(AUTH_STATUSES.AUTHENTICATED);
		router.push("/dashboard");
	};

	const sendOtp = async () => {
		const { data } = await sendOtpM.mutateAsync(chunk.values["email"]);
		if (data.success) {
			setOtpToken(data.token);
		}
	};
	const authenticate = async (otp, isLogin = false) => {
		let m = isLogin ? loginM : signinM;

		const { data } = await m.mutateAsync({
			email: chunk.values["email"],
			otp,
			token: otpToken,
		});
		if (data.success) {
			handleAuthSuccess(data.token, data.user);
		} else setStatus(AUTH_STATUSES.UNAUTHENTICATED);
	};

	const signUp = async (otp) => authenticate(otp, false);
	const login = async (otp) => authenticate(otp);

	const handleDeviceRegistration = async () => {};

	const handleDeviceAuthentication = async (email, useBrowserAutofill = false) => {};
	const signOut = async () => {
		setStatus("unauthenticated");
		setUser(initialState.user);
	};

	return (
		<AuthCtx.Provider
			value={{
				status,
				user,
				handleDeviceRegistration,
				handleDeviceAuthentication,
				signOut,
				sendOtp,
				signUp,
				login,
				authForm: chunk,
				loading: sendOtpM.isLoading || signinM.loading || loginM.isLoading,
			}}
		>
			{children}
		</AuthCtx.Provider>
	);
};
export default AuthProvider;
