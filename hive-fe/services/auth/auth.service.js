import axios from 'axios';
import base from '../config';
import localStore from '../localStore';
import Merchant from '../merchant/merchant.service';

// import base64 from 'base-64';

class Auth {
	static async MerchantLogin(body) {
		const url = `${base.url}MerchantLogin`;
		return axios.post(
			url,
			{
				// ...base.defaults.merchantLogin (),
				...body,
			},
			{
				headers: base.basicH,
			},
		);
	}
	static async MerchantSignup(body) {
		const url = `${base.url}MerchantSignup`;
		return axios.post(
			url,
			{
				// ...base.defaults.merchantSignup (),
				...body,
			},
			{
				headers: base.authHBasic(),
			},
		);
	}
	static async verifyLoginOtp(otp, merchantId) {
		const url = `${base.url}MerchantVerifyLogin/?merchantId=${merchantId}&otp=${otp}`;
		return axios.post(
			url,
			{
				merchantId,
				otp,
			},
			Merchant.headers(merchantId),
		);
	}

	static async logOut({ merchantId }) {
		const devId = localStore.getValueFromKey('dev_intel');
		const url = `${base.url}MerchantLogout/?merchantId=${merchantId}&deviceId=${devId}`;
		return axios.get(url, Merchant.headers(merchantId));
	}
	static async getIPAddress() {
		const url = 'https://api.ipify.org?format=json';
		return await axios.get(url);
	}

	static async getVkitAccessToken() {
		const { data } = await this.getIPAddress();
		console.log(data);

		const { ip } = data;
		axios.get('https://api.verifykit.com/v1.0/access-token', {
			headers: {
				'X-Vfk-Server-Key': ' wJQ1b0bf9ce4634703bf5db394b2e1f1f0ec024a55bdc17ab10bce487f419',
				'X-Vfk-Forwarded-For': ip,
			},
		});
	}
}

export default Auth;
