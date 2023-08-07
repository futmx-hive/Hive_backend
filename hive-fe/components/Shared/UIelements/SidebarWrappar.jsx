import React from "react";
import { useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DbrdCtx } from "@layout/DashboardLayout";
import { slideIn } from "@animations/index";
import Logo from "@shared/SmallComponents/Logo";
import Link from "next/link";

function SidebarWrappar({ children }) {
	const { width, _ } = useContext(DbrdCtx);
	const breakpoint = 1200;
	const isOpen = _.isOpen.toString();
	useEffect(() => {
		if (width > breakpoint && !_.isOpen) return _.open();
	}, [width, isOpen]);
	useEffect(() => {
		if (breakpoint > width) return _.close();
		if (width > breakpoint) _.open();
	}, []);
	const toog = () => width <= breakpoint && _.close();
	return (
		<AnimatePresence>
			{_.isOpen && width < breakpoint && (
				<motion.div className={"backdrop"} onClick={_.close} animate={{ opacity: 1 }} />
			)}

			<motion.div
				variants={breakpoint < width ? {} : slideIn}
				initial='initial'
				animate='final'
				exit='initial'
				id={`${breakpoint > width && _.isOpen ? "res" : ""}`}
				className={`sidebar bg-w ${_.isOpen ? "" : "sidebar_hide"}`}
			>
				<div className='ml-1'>
					<Link href='/home' className={!_.isOpen ? "u-center" : ""}>
						{/* <svg className={`sidebar_logo col-b `}>
							<use xlinkHref={"/svg/sprite/sprite.svg" + (_.isOpen ? "#logo_gr" : "#logo_gr")} />
						</svg> */}
						<a>
							<Logo />
						</a>
					</Link>
					{!_.isOpen && (
						<div onClick={_.open} className='sidebar_toog mt-2'>
							<span></span>
						</div>
					)}
				</div>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}

export default SidebarWrappar;
