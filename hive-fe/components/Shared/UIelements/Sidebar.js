import React, { useEffect, useContext } from "react";
import Link from "next/link";
import SidebarLink from "./sidebarLink";
import SidebarWrappar from "./SidebarWrappar";
import { DbrdCtx } from "@layout/DashboardLayout";

const Sidebar = ({ data }) => {
	const { width, _ } = useContext(DbrdCtx);
	return (
		<SidebarWrappar>
			<ul className='sidebar_list mb-2'>
				{data.map((item, index) =>
					item.name ? (
						<React.Fragment key={item.name + index + "__"}>
							<li className='sidebar_item_heading heading_small cap bord-bott-1 col-g '>
								<span className='ml-2 block pb-1'> {item.name}</span>
							</li>
							<ul className='ml-1'>
								{item.items.map((item, index) => (
									<SidebarLink isOpen={_.isOpen} {...item} key={item.link + index + "<<"} />
								))}
							</ul>
						</React.Fragment>
					) : (
						<SidebarLink isOpen={_.isOpen} {...item} key={index + "++"} />
					),
				)}
			</ul>
			{/* {width} */}
			<div className='sidebar_base u-center'>
				<div className='grid_txt_2'>
					<Link href={"/projects/upload"}>
						<a className='btn_pri btn_bord btn_wide tablet'>upload projects</a>
					</Link>
				</div>
			</div>
		</SidebarWrappar>
	);
};

export default Sidebar;
