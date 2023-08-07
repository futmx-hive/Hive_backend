import Logo from '@shared/SmallComponents/Logo';
import Card from '@sharedUi/Card';
import React from 'react';
import _ from './authLayout.module.scss';

function SingleFormLayout({ children }) {
	return (
		<main className={`fill flexi bg-w-1 ${_.single_form_layout}`}>
			<section className={``}>
				<section className={`${_.single_form} m-auto `}>
					<div className={`mb-2 ${_.logo}`}>
						<Logo id='#logo_gr' />
					</div>
					<Card xtraClassNames={`m-auto`}>{children}</Card>
				</section>
			</section>
		</main>
	);
}

export default SingleFormLayout;
