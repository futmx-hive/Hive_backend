import { useState, useEffect, useRef } from 'react';

const useResize = () => {
	const [width, setWidth] = useState(0);
	const putWidth = () => setWidth(window.innerWidth || document.body.clientWidth);
	const timerRef = useRef(null);
	useEffect(() => {
		clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => window.addEventListener('resize', putWidth), 200);

		return () => window.removeEventListener('resize', putWidth);
	});

	useEffect(() => setWidth(window.innerWidth), []);
	return width;
};

export default useResize;
