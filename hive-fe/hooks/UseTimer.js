import { useEffect, useRef, useState } from "react";
const formatTime = (time) => {
	let timeInSec = time / 1000;
	timeInSec = timeInSec < 9 ? `0${timeInSec}` : timeInSec;
	return `00:${timeInSec}`;
};

const UseCountdown = (clb, upTime = 30000) => {
	const [time, setTime] = useState(0);
	const reset = () => setTime(0);
	const t = useRef();
	useEffect(() => {
		if (time !== upTime)
			t.current = setTimeout(() => {
				setTime((prev) => prev + 1000);
			}, 1000);
		else clb();
		return () => {
			clearInterval(t.current);
		};
	}, [time, upTime]);
	return { reset, formattedTime: formatTime(Number(upTime) - time) };
};

export default UseCountdown;
