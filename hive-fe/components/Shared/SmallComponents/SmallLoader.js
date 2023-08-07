const SmallLoader = ({ scale = 0.8, classes, transform = "" }) => {
	return (
		<div className={`lds-spinner ${classes}`} style={{ transform: `scale(${scale ? scale : 1}) ${transform}` }}>
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
		</div>
	);
};

export default SmallLoader;
