import { fadeIn, an } from "@animations/index";
import { motion } from "framer-motion";

const SpaceBottom = ({ children }) => {
	const animation = fadeIn();
	return (
		<motion.div
			variants={{
				...animation,
				final: {
					...animation.final,
					transition: {
						...animation.transition,
						when: "beforeChildren",
					},
				},
			}}
			{...an}
			exit='initial'
			className='space_bottom bg-w-1'
		>
			{children}
		</motion.div>
	);
};

export default SpaceBottom;
