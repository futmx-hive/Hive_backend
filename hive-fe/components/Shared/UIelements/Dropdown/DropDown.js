import React, { useRef } from 'react';
import { Fragment } from 'react';
import UseClickOutsideToclose from '@hooks/UseClickOutsideToclose';
import UseToggle from '@hooks/UseToogle';
import RenderIfTrue from '@shared/SmallComponents/RenderIfTrue';
import SmallLoader from '../../SmallComponents/SmallLoader';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeUp, an } from '../../../../Animations';
import Icon from '@shared/SmallComponents/Icon';

const DropDown = ({ indicator, children, classes, indFill, listOutside = false, isLoading = false }) => {
	const ref = useRef();
	const { isOpen, toogle, close } = UseToggle(false);
	UseClickOutsideToclose(ref, close);
	const toogler = !!indicator ? (
		React.cloneElement(indicator, {
			...indicator.props,
			action: toogle,
		})
	) : (
		<button className='dropdown_toggle p-x-1' onClick={toogle} type='button'>
			<Icon id={'#updown'} />
		</button>
	);

	const list = (
		<RenderIfTrue condition={isOpen}>
			<motion.div
				className='dropdown_base basecard bord-g-1 bg-w br'
				onClick={(e) => e.stopPropagation()}
				style={{ zIndex: 5 }}
				animate={isOpen ? { opacity: 1 } : { opacity: 0, scale: 0 }}
				// exit={{opacity: 0}}
			>
				<ul className='dropdown_list'>{children}</ul>
			</motion.div>
		</RenderIfTrue>
	);
	return (
		<AnimatePresence>
			<Fragment>
				<div className={`dropdown ${classes}`} ref={ref}>
					{isLoading ? <SmallLoader scale={0.2} classes='dropdown_toggle al-s-center' /> : toogler}
					{!listOutside && !isLoading ? list : null}
				</div>
				{listOutside && !isLoading ? list : null}
			</Fragment>
		</AnimatePresence>
	);
};

export default DropDown;
