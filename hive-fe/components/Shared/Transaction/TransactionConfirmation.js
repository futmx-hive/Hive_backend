import CloseBtn from '@shared/SmallComponents/CloseBtn';
import Card from '@sharedUi/Card';
import CtaButton from '@sharedUi/CtaButton';

function TransactionConfirmation({ close }) {
	return (
		<Card xtraClassNames={`pos-r p-3 ${classes}`} stop>
			<CloseBtn close={close} />
			<div className='grid_txt_2 center-grid'>
				<h5 className='heading_huge'>Yay! 🎉</h5>
				<h6 className='heading_avg weit-1 cap'> purchased successfully</h6>
				<CtaButton design='btn_bord col-pri tablet'>view details</CtaButton>
			</div>
		</Card>
	);
}

export default TransactionConfirmation;
