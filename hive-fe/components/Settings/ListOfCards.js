import UseToggle from "@hooks/UseToogle";
import Modal from "@sharedUi/Modal";
import React from "react";
import AddedPaymentMtd from "./AddedPaymentMtd";
import FormAddCard from "./Forms/FormAddCard";
import _ from "./style.module.scss";

export default function ListOfCards() {
	const toog = UseToggle();
	return (
		<>
			<section className={`${_.pay_mtd_con}`}>
				<AddedPaymentMtd />
				<AddedPaymentMtd />
				<AddedPaymentMtd isButton buttonText='Add new device' onClick={toog.open} />
			</section>
			<Modal isOpen={toog.isOpen} close={toog.close}>
				<FormAddCard />
			</Modal>
		</>
	);
}
