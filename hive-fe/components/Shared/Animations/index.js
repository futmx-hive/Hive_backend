export const fadeUp = {
	initial: {
		y: '20%',
		opacity: 0,
	},
	final: {
		y: '0',
		opacity: 1,
		transition: {
			duration: 0.1,
		},
	},
};
export const fadeIn = (duration = 0.0205) => ({
	initial: {
		opacity: 0,
	},
	final: {
		opacity: 1,
		transition: {
			duration,
		},
	},
});
export const slideIn = {
	initial: {
		x: -1000,
	},
	final: {
		x: 0,
		transition: {
			type: 'spring',
			ease: 'linear',
			duration: 0.04,
		},
	},
};

export const scaleUp = {
	initial: {
		y: '30%',
		opacity: 0,
		scale: 3,
	},
	final: {
		y: 0,
		scale: 1,
		opacity: 1,
		transition: {
			duration: 0.2,
		},
	},
};

export const comeUp = {
	initial: {
		y: '30%',
		opacity: 0,
	},
	final: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.13,
		},
	},
};

export const an = {
	initial: 'initial',
	animate: 'final',
};
