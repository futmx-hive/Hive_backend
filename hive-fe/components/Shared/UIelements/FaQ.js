import React from "react";
import UseToogle from "@hooks/UseToogle";
import RenderIfTrue from "../SmallComponents/RenderIfTrue";
import Icon from "../SmallComponents/Icon";
import { AnimatePresence, motion } from "framer-motion";

const Faq = ({
	children,
	title,
	Component,
	classes,
	locked = false,
	initialIsOpen = false,
	containerClasses = "",
	openClasses = "",
	titleClasses = "",
	headerClasses = "faq_header",
}) => {
	const { isOpen, toogle } = UseToogle(initialIsOpen);
	return (
		<div
			className={`faq ${isOpen && !locked ? "open " + openClasses : ""} ${
				containerClasses && containerClasses
			}`}
		>
			<div onClick={toogle} className={`${headerClasses} sp-btw flexi `}>
				{title ? <h4 className={`form_heading ${titleClasses}`}>{title}</h4> : Component}
				<div>{!locked && <Icon id={"#rarr"} classes={`small_svg faq_btn  `} />}</div>
			</div>
			<AnimatePresence>
				{isOpen && !locked && (
					<motion.div
						initial={{ opacity: 1, transformOrigin: "0 0" }}
						animate={{ opacity: 1 }}
						transition={{
							duration: 1,
						}}
						exit={{
							originY: 0,
							scaleY: [1, 0.8, 0.6, 0],
							opacity: 0,
							transition: {
								duration: 0.2,
							},
						}}
						className={classes ? classes : "form_pkg "}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Faq;
