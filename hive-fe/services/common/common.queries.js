import { useQuery, useQueries } from 'react-query';
import common from './common.service';

const UseCountries = () => {
	return useQuery('country', common.getCountries, {
		staleTime: Infinity,
		cacheTime: Infinity,
		refetchOnMount: false,
		keepPreviousData: true,
	});
};
const UseBanks = (countryCode) => {
	return useQuery('banks', () => common.getBanks(countryCode), {
		staleTime: Infinity,
		cacheTime: Infinity,
		refetchOnMount: false,
		keepPreviousData: true,
	});
};
const UseTimeUnits = () => {
	return useQuery('banks', common.getTimeUnits, {
		staleTime: Infinity,
		cacheTime: Infinity,
		refetchOnMount: false,
		keepPreviousData: true,
	});
};
const UseListDelSalesAndPaymentMtd = () => {
	const options = {
		staleTime: Infinity,
		cacheTime: Infinity,
		refetchOnMount: false,
		keepPreviousData: true,
	};

	return useQueries([
		{
			queryFn: async () => common.getList('deliveryMethod'),
			queryKey: 'delivery_method_list',
			...options,
		},
		{
			queryFn: async () => common.getList('salesChannel'),
			queryKey: 'sales_channel_list',
			...options,
		},
		{
			queryFn: async () => common.getList('paymentMethod'),
			queryKey: 'payment_methods_list',
			...options,
		},
	]);
};

export { UseCountries, UseBanks, UseTimeUnits, UseListDelSalesAndPaymentMtd };
