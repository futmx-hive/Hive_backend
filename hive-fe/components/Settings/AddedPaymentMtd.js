import CloseBtn from "@shared/SmallComponents/CloseBtn";
import Icon from "@shared/SmallComponents/Icon";
import React from "react";
import _ from "./style.module.scss";

export default function AddedPaymentMtd({
	title = "iPhone 13",
	base = "added 2months ago",
	onDelete = () => null,
	isButton = false,
	buttonText = "add new bank account",
	onAdd = () => null,
	onClick = () => null,
}) {
	const chunk = isButton ? (
		<>
			<button className='flexi gap-15 cap heading_small' onClick={onClick}>
				<div className='nano-ci bg-b center-flex'>
					<Icon id={"#plus"} />
				</div>
				<span className='btn_txt'> {buttonText}</span>
			</button>
		</>
	) : (
		<>
			<CloseBtn close={onDelete} classes='bg-or br-1' />
			<div className='grid_txt'>
				<h6 className='heading_small weit-2'>{title}</h6>
				<p className='small cap'> {base}</p>
			</div>
		</>
	);

	return <article className={`pos-r ${!isButton ? _.pay_mtd_item : _.pay_mtd_btn}`}>{chunk}</article>;
}
