import Logo from "@shared/SmallComponents/Logo";
import Link from "next/link";
import React from "react";
import _ from "./style.module.scss";
function Header() {
	return (
		<header className={`p-y-2 ${_.header_main}`}>
			<div className='container-main'>
				<div className='sp-btw flexi'>
					<Link href={"/"}>
						<a>
							<Logo />
						</a>
					</Link>
					<div className='flexi gap-25'>
						<Link href={"/about"}>
							<a href='' className='btn-txt col-bl'>
								our team
							</a>
						</Link>
						{/* <Link href={"/about"}>
							<a className='btn btn_pri btn_wide tablet'>About us</a>
						</Link> */}
						<Link href={"/auth/login"}>
							<a className='btn btn_pri btn_wide tablet'>Login</a>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
