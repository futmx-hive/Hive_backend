import Icon from "@shared/SmallComponents/Icon";
import ModalBackAndText from "@shared/SmallComponents/ModalBackAndText";
import Card from "@sharedUi/Card";
import CtaButton from "@sharedUi/CtaButton";
import _ from "./style.module.scss";

function ReviewCommodityDetails({ classes = "modal_w_med", close }) {
	return (
		<Card xtraClassNames={`pos-r p-3 ${classes}`} stop>
			<ModalBackAndText h={"Review details"} />
			<article className='grid_txt_2 mt-2'>
				<div className='center-grid u-center'>
					<div className='grid_txt mb-2'>
						<div className='small-ci bg-g-2 center-flex m-auto'>
							<Icon id={"#downarr"} />
						</div>
						<p className='heading_small cap'> buy commodity</p>
					</div>
				</div>
			</article>
			<ul className={` bord-g-1 br-1 ${_.rec_tx_det}`}>
				<li className='flexi sp-btw heading_small col-b'>
					<span className='col-gra-l'> wallet</span>
					<span> maize (SMZ)</span>
				</li>
				<li className='flexi sp-btw heading_small col-b'>
					<span className='col-gra-l'> Amount bought</span>
					<span> ₦20,000</span>
				</li>
				<li className='flexi sp-btw heading_small col-b'>
					<span className='col-gra-l'> You recieve</span>
					<span> ₦19699</span>
				</li>
				<li className='flexi sp-btw heading_small col-b'>
					<span className='col-gra-l'> Fee</span>
					<span>₦311 </span>
				</li>
				<li className='flexi sp-btw heading_small col-b'>
					<span className='col-gra-l'> Rate</span>
					<span> ₦156/ SMZ</span>
				</li>
				<li className='flexi sp-btw heading_small col-b'>
					<span className='col-gra-l'> Payment method</span>
					<span> ***3433 VISA</span>
				</li>
			</ul>
			<div className='grid mt-2'>
				<CtaButton design='btn_pri tablet'>buy now</CtaButton>
			</div>
		</Card>
	);
}

export default ReviewCommodityDetails;
