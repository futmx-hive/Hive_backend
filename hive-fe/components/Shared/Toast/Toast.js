import UseMyToast from "./useMyToast";
import UseTimer from "@hooks/UseTimer";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../Animations";
const Toast = ({ text, position, type, id }) => {
	const { removeToast } = UseMyToast();
	const fx = () => removeToast(id);
	const { reset, formattedTime: time } = UseTimer(fx, 5000);
	const evalClass = () => {
		switch (type) {
			case "error":
				return " bg-r";
			case "warning":
				return " bg-y";
			default:
				return " bg-gr";
		}
	};

	const vars = {
		initial: {
			y: 25,
		},
		final: {
			y: 0,
		},
	};

	return (
		<AnimatePresence>
			<motion.div
				variants={vars}
				initial='initial'
				animate='final'
				exit={{
					y: -100,
					transition: {
						duration: 0.5,
					},
				}}
				onClick={() => removeToast(id)}
				className={`toast u-center heading_tiny   br col-w ${evalClass()}`}
			>
				{text}
			</motion.div>
		</AnimatePresence>
	);
};

export default Toast;
