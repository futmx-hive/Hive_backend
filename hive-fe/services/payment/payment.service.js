import axios from 'axios';
import base from '../config';
import Merchant from '../merchant/merchant.service';

export default class Payment {
	static async togglePaymentOption({ merchantId, mmStatus, bpStatus }) {
		const url = `${base.url}TogglePaymentOption/?merchantId=116&mmPayment=${mmStatus}&bankPayment=${bpStatus}`;
		return axios.get(url);
	}
	static async getMerchantPaymentInfo({ merchantId }) {
		const url = `${base.url}MerchantPaymentInfo/?merchantId=${merchantId}`;
		return base.makeReq(async () => await axios.get(url));
	}
	static async getMerchantPaymentDashboard({ merchantId }) {
		const url = `${base.url}MerchantPaymentDashboard/?merchantId=${merchantId}`;
		return base.makeReq(async () => await axios.get(url));
	}

	static async recordManualPayment({ orderId, notes, date }) {
		const url = `${base.url}RecordPayment/?orderId=${orderId}&notes=${notes}&date=${date}`;
		return base.makeReq(async () => await axios.get(url, Merchant.headers()));
	}
	static crudMobileMoney = base.doCRUD('MMContact');
	static crudBankDetails = base.doCRUD('MerchantBank');
}
