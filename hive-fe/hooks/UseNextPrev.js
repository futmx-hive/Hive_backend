function UseNextPrev(func) {
	const go = (i) => () => func(i);
	return {
		go,
	};
}

export default UseNextPrev;
