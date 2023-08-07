import HideOnMobile from '@layout/HideOnMobile';
import Icon from '@shared/SmallComponents/Icon';
import React from 'react';

function TheadCom() {
	return (
		<thead className='thead'>
			<tr>
				<HideOnMobile>
					<th className='weit-3'>
						<div className='flexi gap-15'>
							<span>Rank</span>
							<Icon id={'#updown'} />
						</div>
					</th>
				</HideOnMobile>
				<th className='weit-3'>
					<div className='flexi gap-15'>
						<span>CommodityName</span>
						<Icon id={'#updown'} />
					</div>
				</th>
				<th className='weit-3'>
					<div className='flexi gap-15'>
						<span>Price</span>
						<Icon id={'#updown'} />
					</div>
				</th>
				<HideOnMobile>
					<th className='weit-3'>
						<div className='flexi gap-15'>
							<span>unit</span>
							<Icon id={'#updown'} />
						</div>
					</th>
					<th className='weit-3'>
						<div className='flexi gap-15'>
							<span>%7d</span>
							<Icon id={'#updown'} />
						</div>
					</th>
					<th className='weit-3'>
						<div className='flexi gap-15'>
							<span>chart</span>
							<Icon id={'#updown'} />
						</div>
					</th>
				</HideOnMobile>
			</tr>
		</thead>
	);
}

export default TheadCom;
