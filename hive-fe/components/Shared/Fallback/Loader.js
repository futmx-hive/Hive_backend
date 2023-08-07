import React from 'react';
import Card from '@sharedUi/Card';
import SmallLoader from '@shared/SmallComponents/SmallLoader';

export default function Loader({ loading, isError, retry, errorMsg }) {
	return loading ? (
		<div className='fill center-flex p-5'>
			<SmallLoader />
		</div>
	) : isError ? (
		<div className='fill flexi' style={{ alignContent: 'center' }}>
			<Card classes='u-center-center-flex container-c833 p-5 bord-g-1'>
				<div className='grid_txt_2 js-center'>
					<h2 className='heading_small'>{errorMsg?.message || 'an error occured please try again'}</h2>
					<div className='u-center'>
						<button
							className='btn_blue btn_wide col-gra-btn-l heading_small_1 '
							onClick={() => retry()}>
							retry
						</button>
					</div>
				</div>
			</Card>
		</div>
	) : null;
}
