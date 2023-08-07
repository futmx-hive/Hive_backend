import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Socials from './social.service';
import { addUserdata } from '../../redux/user/actions';
import useMyToast from '../../Components/Shared/UIelements/Toast/useMyToast';
import * as ac from '../../redux/user/actions';

export function UseUpdateWhatsappNumber() {
	const { addToast } = useMyToast();
	const { merchantId } = useSelector((state) => state.user.userInfo);
	const dispatch = useDispatch();
	const Qc = useQueryClient();
	return useMutation(({ phone }) => Socials.updateWhatsappNumber({ merchantId, phone }), {
		retry: false,
		onMutate(data) {
			Qc.cancelMutations();
		},
		onSuccess(_, variables) {
			dispatch(
				ac.addUserdata({
					whatsAppChatSupport: variables.phone,
				}),
			);
			addToast({
				text: `successfully updated your number to ${variables.phone}`,
				isTop: true,
			});
		},
		onError() {
			addToast({
				text: `an error occured please try again`,
				type: 'error',
				isTop: true,
			});
		},
	});
}

export function UseToogleWhatsappSupport() {
	const { merchantId } = useSelector((state) => state.user.userInfo);
	const dispatch = useDispatch();
	const { addToast } = useMyToast();
	const Qc = useQueryClient();
	return useMutation(({ state }) => Socials.toggleWhatsappSupport({ state, merchantId }), {
		onMutate(data) {
			Qc.cancelMutations();
		},
		onSuccess(_, variables) {
			// console.log ({variables, data: _});
			dispatch(
				addUserdata({
					whatsAppEnabled: variables.state,
				}),
			);
			addToast({
				text: variables.state === 'T' ? 'Activated whatsapp support ' : ' Deactivated whatsapp support',
				position: 'center',
				isTop: true,
			});
		},
		onError() {
			addToast({
				text: `an error occured please try again`,
				type: 'error',
				isTop: true,
			});
		},
	});
}
