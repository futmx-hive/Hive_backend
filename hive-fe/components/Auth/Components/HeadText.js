import _ from "../style.module.scss";

function HeadText({ h, p = "proceed to research on something amazing" }) {
	return (
		<aside className={`${_.head_txt} u-center `}>
			<h1 className='heading_med_2 cap'>{h}</h1>
			<p className='heading_small center-grid '>{p}</p>
		</aside>
	);
}

export default HeadText;
