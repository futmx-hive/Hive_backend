import UseToggle from '@hooks/UseToogle';
import Modal from '@sharedUi/Modal';
import React from 'react';
import AddedPaymentMtd from './AddedPaymentMtd';
import FormAddBankAccount from './Forms/FormAddBankAccount';
import _ from './style.module.scss';
function ListOfBanks() {
	const toog = UseToggle();
	return (
		<>
			<section className={`${_.pay_mtd_con}`}>
				<AddedPaymentMtd title='Access bank' base='2030405075' />
				<AddedPaymentMtd title='Access bank' base='2030405075' />
				<AddedPaymentMtd isButton onClick={toog.open} />
			</section>
			<Modal isOpen={toog.isOpen} close={toog.close}>
				<FormAddBankAccount />
			</Modal>
		</>
	);
}

export default ListOfBanks;
