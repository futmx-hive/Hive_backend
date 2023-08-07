import React from "react";
import _ from "./style.module.scss";
export default function Member({ src, name }) {
	return (
		<div className={`grid_txt_3 ${_.member} center-grid`}>
			<figure className={`round  `}>
				<img src={src} alt='' />
			</figure>
			<h5 className='heading_med'>{name}</h5>
		</div>
	);
}
