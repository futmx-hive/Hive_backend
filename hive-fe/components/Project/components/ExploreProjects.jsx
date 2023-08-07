import React from "react";

function ExploreProjects({ bg = "/photos/explore.jpg" }) {
	return (
		<div
			className='p-4 pos-r  col-w br  hidden'
			style={{
				backgroundImage: `url(${bg})`,
				backgroundSize: "100%",
				backgroundPosition: "0 50%",
			}}
		>
			<div className='abs-fill bg-opa'></div>
			<div className=' pos-r'>
				<h1 className='heading_xl mb-3 block'> Explolore our project archives to get more insights</h1>
				<button className='btn_wide_1 btn_gold  heading_huge tablet'>explore</button>
			</div>
		</div>
	);
}

export default ExploreProjects;
