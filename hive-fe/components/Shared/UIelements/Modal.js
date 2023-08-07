import React, { Children, Fragment, useEffect } from 'react';
import UseToggle from '@hooks/UseToogle';
import { AnimatePresence, motion } from 'framer-motion';
import { an, fadeIn } from '../../../Animations';
// import {createPortal} from 'react-dom';

function Modal({ children, close, isOpen, onSubmit, classes, fill = false, clickBackDropClose = true }) {
	const { isOpen: shouldBlock, close: unBlock, open: block } = UseToggle(false);
	const closeModal = () => {
		if (clickBackDropClose && !shouldBlock) close();
	};
	useEffect(() => {
		unBlock();
	}, [isOpen, unBlock]);
	return (
		<AnimatePresence>
			{isOpen ? (
				<Fragment>
					<div className='backdrop fill' onClick={closeModal} />
					<div className={`fixed_modal_pack ${fill ? 'fill' : ''}`} onClick={closeModal}>
						<motion.div
							variants={fadeIn(0.2)}
							{...an}
							exit='initial'
							className={`modal  ${classes} topup`}>
							{Children.map(children, (child) =>
								React.cloneElement(child, {
									close,
									onSubmit,
									block,
									unBlock,
									...child.props,
								}),
							)}
						</motion.div>
					</div>
				</Fragment>
			) : null}
		</AnimatePresence>
	);

	// return createPortal (element, document.getElementById ('modal_container'));
}

export default Modal;
