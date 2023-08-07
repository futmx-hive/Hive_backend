import Card from '@sharedUi/Card';
import SearchBox from '@sharedUi/SearchBox';
import React from 'react';
import _ from './style.module.scss';
import TheadCom from './TheadCom';
import TrowCom from './TrowCom';

function ComHome() {
	return (
		<section className={`${_.comm_home} mt-2`}>
			<div className='container-lg'>
				<SearchBox />
			</div>
			<div className='container-lg'>
				<Card xtraClassNames={'pb-5 mt-4'}>
					<table>
						<TheadCom />
						<tbody>
							<TrowCom />
							<TrowCom />
							<TrowCom />
							<TrowCom />
							<TrowCom />
							<TrowCom />
							<TrowCom />
						</tbody>
					</table>
				</Card>
			</div>
		</section>
	);
}

export default ComHome;
