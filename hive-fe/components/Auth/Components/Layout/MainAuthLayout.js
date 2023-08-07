import HideOnMobile from "@layout/HideOnMobile";
import Icon from "@shared/SmallComponents/Icon";
import Logo from "@shared/SmallComponents/Logo";
import React from "react";
import FormAuth from "../Forms/FormAuth";
import FormOAuth from "../Forms/FormOAuth";
import HeadText from "../HeadText";
import _ from "./authLayout.module.scss";
import Link from "next/link";

function MainAuthLayout({ children }) {
	return (
		<main className={`${_.auth_layout} bg-w-1`}>
			<div className={`${_.auth_layout_left}`}>
				<Link href={"/"}>
					<a>
						<Logo id='#logo' />
					</a>
				</Link>
				<article className={`${_.auth_form}`}>{children}</article>
			</div>
			<HideOnMobile>
				<div className={`${_.auth_layout_right} pos-r`}>
					<RightPanel />
				</div>
			</HideOnMobile>
		</main>
	);
}

export default MainAuthLayout;

function RightPanel() {
	return (
		<div className={`${_.auth_layout_right_pane}`}>
			<article className='grid_txt_2 '>
				<h1 className='heading_xl col-w'>Project management system</h1>
				<ul className='grid_txt mt-2'>
					<li className='flexi gap-15'>
						<Icon id={"#check"} />
						<p className='heading_med col-w weit-1'>collaborate with your supervisors</p>
					</li>
					<li className='flexi gap-15'>
						<Icon id={"#check"} />
						<p className='heading_med col-w weit-1'>handle all project related converations</p>
					</li>
					<li className='flexi gap-15'>
						<Icon id={"#check"} />
						<p className='heading_med col-w weit-1 '>
							explore a large pool of projects to get insights
						</p>
					</li>
				</ul>
			</article>
			<div className='flexi'>
				<Link href={"/search"}>
					<a href='' className='btn btn_small btn_icon col-blu bg-w tablet flexi'>
						<Icon id={"#check"} />
						<span>Secured. FDIC Approved</span>
					</a>
				</Link>
			</div>
		</div>
	);
}
