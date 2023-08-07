import Card from '@sharedUi/Card';
import React from 'react';
import _ from './style.module.scss';

function RecentTransactions() {
	return (
		<Card xtraClassNames={'p-3'}>
			<div className='sp-btw mb-2'>
				<h6 className='heading_small cap'>Recent transactions</h6>

				<button className='btn_txt col-b cap'>view all</button>
			</div>
			<div className={`${_.tx_items_con}`}>
				<TransactionItem />
				<TransactionItem />
				<TransactionItem />
				<TransactionItem />
			</div>
		</Card>
	);
}

export default RecentTransactions;

function TransactionItem() {
	return (
		<artcle className='sp-btw flexi'>
			<div className='grid_txt_1'>
				<h4 className='weit-2 mt-1 flexi'>
					<span className='mr-m upp'>maize</span>{' '}
					<span className='small weit-1 upp col-gra-btn-l'> smz</span>
				</h4>
				<p className='col-gra-d'>Bought ₦ 6,641.20</p>
			</div>
			<span className='badge_bg badge_ora'>processing</span>
		</artcle>
	);
}
