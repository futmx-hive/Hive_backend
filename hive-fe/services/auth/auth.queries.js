import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import useMyToast from '../../Components/Shared/UIelements/Toast/useMyToast';
import * as ac from '../../redux/user/actions';
import Auth from './auth.service';

export function UseMerchantLogin() {
	return useMutation((data) => Auth.MerchantLogin(data), {
		retry: false,
	});
}

export function UseVerifyOTP() {
	return useMutation(({ otp, merchantId }) => Auth.verifyLoginOtp(otp, merchantId));
}

export function UseMerchantSignup() {
	return useMutation((data) => Auth.MerchantSignup(data));
}

export function UseLogOut() {
	const { merchantId } = useSelector((state) => state.user.userInfo);
	const { addToast } = useMyToast();
	const dispatch = useDispatch();
	return useMutation(() => Auth.logOut({ merchantId }), {
		onSuccess(data) {
			dispatch(ac.clearUserdata());
		},
		retry: false,
	});
}
