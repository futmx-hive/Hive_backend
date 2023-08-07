import { useQuery, useMutation, useQueries, useQueryClient } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import Payment from './payment.service';
import { M_OV, M_OR } from '../merchant/merchant.queries';
import Merchant from '../merchant/merchant.service';
import * as ac from '../../redux/user/actions';

const M_P_D = 'merchant_payment_dashboard';
const M_P_I = 'merchant_payment_info';

export function useGetPaymentDashboard() {
	const { merchantId } = useSelector((state) => state.user.userInfo);
	return useQuery([M_P_D], () => Payment.getMerchantPaymentDashboard({ merchantId }));
}

export function UseGetPaymentInfo() {
	const { merchantId } = useSelector((state) => state.user.userInfo);
	return useQuery([M_P_I], () => Payment.getMerchantPaymentInfo({ merchantId }), {
		retry: false,
		refetchOnWindowFocus: false,
	});
}

export function UseCrudMM() {
	const { merchantId } = useSelector((state) => state.user.userInfo);
	const dispatch = useDispatch();
	const QC = useQueryClient();
	return useMutation((chunk) => Payment.crudMobileMoney({ ...chunk, entityId: merchantId }, chunk.crud), {
		onMutate() {
			QC.cancelQueries(M_P_I);
		},
		onSuccess(data) {
			QC.invalidateQueries(M_P_I);
			QC.invalidateQueries(M_OV);
			Merchant.getMerchantProfile({ merchantId }).then(({ data }) => {
				dispatch(ac.addUserdata(data));
			});
		},
	});
}
export function UseCrudBank() {
	const { merchantId } = useSelector((state) => state.user.userInfo);
	const QC = useQueryClient();
	const dispatch = useDispatch();
	return useMutation((chunk) => Payment.crudBankDetails({ ...chunk, merchantId }, chunk.crud), {
		onMutate() {
			QC.cancelQueries(M_P_I);
		},
		onSuccess(data) {
			QC.invalidateQueries(M_P_I);
			Merchant.getMerchantProfile({ merchantId }).then(({ data }) => {
				dispatch(ac.addUserdata(data));
			});
		},
	});
}

export function UseRecordManualPayment() {
	const QC = useQueryClient();
	return useMutation(({ notes, orderId, date }) => Payment.recordManualPayment({ orderId, notes, date }), {
		onSuccess(data, formValues) {
			QC.invalidateQueries(M_OV);
			QC.invalidateQueries([M_OR, formValues.orderId]);
		},
	});
}

export { M_P_D, M_P_I };
