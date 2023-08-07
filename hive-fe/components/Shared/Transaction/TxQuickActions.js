import Card from '@sharedUi/Card';
import React from 'react';
import _ from './style.module.scss';

function TxQuickActions() {
	return (
		<Card xtraClassNames={'p-3'}>
			<section className='grid_txt_2'>
				<h6 className='heading_small cap  weit-2'>quick actions</h6>

				<div className='grid_txt_1'>
					<button className=' btn_large btn_bord col-pri tablet'>Buy</button>
					<button className=' btn_large btn_bord col-pri tablet'>sell</button>
				</div>

				<aside className={`flexi gap-25 sp-btw `}>
					<Action icon={'swap'} text='swap' classes={'bg-y-l'} />
					<Action icon={'send'} text='send' classes={'bg-or'} />
					<Action icon={'receive'} text='recieve' classes={'bg-or'} />
				</aside>
			</section>
		</Card>
	);
}

export default TxQuickActions;

function Action({ icon, text, onClick = () => null, classes }) {
	return (
		<div className='grid_txt_1 u-center js-center'>
			<button className={`small_ci center_flex ${_.q_actions_btn} ${classes}`} onClick={onClick}>
				<svg>
					<use xlinkHref={`/svg/sprite/sprite.svg#${icon}`}></use>
				</svg>
			</button>
			<span>{text}</span>
		</div>
	);
}
