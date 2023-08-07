import BalanceShowcase from '@components/Dashboard/BalanceShowcase';
import Icon from '@components/Shared/SmallComponents/Icon';
import TrendValue from '@components/Shared/SmallComponents/TrendValue';
import UseToggle from '@hooks/UseToogle';
import HideOnMobile from '@layout/HideOnMobile';
import BackButtonAndText from '@shared/SmallComponents/BackButtonAndText';
import FormTrade from '@shared/Transaction/FormTrade';
import RecentTransactions from '@shared/Transaction/RecentTransactions';
import Card from '@sharedUi/Card';
import Faq from '@sharedUi/FaQ';
import Modal from '@sharedUi/Modal';
import React from 'react';
import ReviewCommodityDetails from './ReviewCommodityDetails';
import _ from './style.module.scss';

const faqData = ['website', 'explorers', 'reddit', 'source code', 'technical documentation'];

function SingleComodityDetails() {
	const modToog = UseToggle();
	return (
		<div className='container-lg con_5_2 al-start'>
			<section className={`${_.commodity_con}`}>
				<div className='mt-2'>
					<BackButtonAndText />
				</div>
				<DetailsHeader open={modToog.open} />
				<BalanceShowcase />
				<DetailsBase />
			</section>
			<aside className={`${_.commodity_con} `}>
				<FormTrade />
				<RecentTransactions />
			</aside>
			<Modal isOpen={modToog.isOpen} close={modToog.close}>
				<ReviewCommodityDetails />
				{/* <FormTrade classes='modal_w_med' /> */}
			</Modal>
		</div>
	);
}

export default SingleComodityDetails;

function DetailsHeader({ open }) {
	return (
		<Card xtraClassNames={`p-3 ${_.details_pkg}`}>
			<div className={`flexi sp-btw mb-3 ${_.details_header}`}>
				<div className='grid_txt_1'>
					<h5 className='cap'>maize(SMZ) Wallet</h5>
					<h4 className='heading_lg weit-3 flexi gap-15'>
						<span>₦50,545</span>
						<TrendValue value={'5.04'} />
					</h4>
					<span className='cap heading_tiny'>10 units</span>
				</div>

				<div className='flexi gap-25'>
					<button className='btn_bord col-pri tablet btn_large' onClick={open}>
						send
					</button>
					<button className='btn_bord col-pri tablet btn_large'>recieve</button>
				</div>
			</div>
			<div className={`hr ${_.hr}`}></div>

			<article className={`${_.comm_head_det}`}>
				<div>
					<p className='heading_avg upp weit-2'> maize</p>
					<span className='small col-gra-d upp'> smaz</span>
				</div>
				<div>
					<p className='col-gra-l cap '> market price</p>
					<span className='heading_small weit-2 upp no-wrap'> ₦ 520.80</span>
				</div>
				<div>
					<p className='col-gra-l cap '> unit</p>
					<span className='heading_small weit-2 cap'>Per ton</span>
				</div>
				<HideOnMobile>
					<div>
						<p className='flexi gap-15 cap col-gra-l weit-2'>
							<Icon id={'#clock'} />
							<span>24h change</span>
							<Icon id={'#updown'} />
						</p>
						<span className='heading_small weit-2 cap col-gr'>520.80+125%</span>
					</div>
				</HideOnMobile>
			</article>
		</Card>
	);
}

function DetailsBase() {
	return (
		<Card xtraClassNames={'p-3'}>
			<div className='grid_txt'>
				<h6 className='heading_med cap weit-2'>About Maize (SMZ)</h6>
				<p className='col-gra-l'>
					Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
					consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
				</p>
			</div>
			<div className={`hr mt-2 ${_.hr}`}></div>
			<article className='mt-2 flex gap-15 wrap'>
				<button className='btn_small no-wrap  small tablet btn_bord col-gra-l'>mineable</button>
				<button className='btn_small  no-wrap  small tablet btn_bord col-gra-l upp'>pow</button>
				<button className='btn_small  no-wrap  small tablet btn_bord col-pri'>sha 256</button>
				<button className='btn_small  no-wrap  small tablet btn_bord col-gra-l'>store-of-value</button>
				<button className='btn_small  no-wrap  small tablet btn_bord col-gra-l'>state channels</button>
			</article>

			<aside className='mt-2 grid_txt_1'>
				{faqData.map((data) => (
					<Faq title={data} key={data} containerClasses='bord-bott-1' />
				))}
			</aside>
		</Card>
	);
}
