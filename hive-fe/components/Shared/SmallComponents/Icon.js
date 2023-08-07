import React from "react";

function Icon({ id, classes = "tiny_svg", style }) {
	return (
		<svg ref={null} className={`${classes ? classes : ""}`} style={style}>
			<use xlinkHref={`/svg/sprite/sprite.svg${id}`}></use>
		</svg>
	);
}

export default Icon;
