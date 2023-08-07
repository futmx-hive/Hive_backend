import { useState, useCallback } from 'react';

const UseToggle = (state) => {
	const [isOpen, toggle] = useState(state);

	const open = useCallback(() => {
		toggle(true);
	}, []);
	const close = useCallback(() => toggle(false), []);
	const toogle = () => toggle((prev) => !prev);
	const set = (val) => toggle(val);

	return { isOpen, close, open, toogle, set };
};

export default UseToggle;
