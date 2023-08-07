import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scaleUp } from "@animations/index";
import Link from "next/link";
import { useRouter } from "next/router";

let sprite = "/svg/sprite/sprite1.svg";

const SidebarLink = ({ title, icon, link, count, onClick = () => null, isOpen }) => {
	const { pathname } = useRouter();
	return (
		<li className='sidebar_list_item' onClick={onClick}>
			<Link
				href={`/${link ? link : icon}`}

				// activeClassName=
			>
				<a
					className={`sidebar_link  cap flexi br ${
						new RegExp(`^${link}$`, "gi").test(pathname.slice(1)) ? "active" : ""
					}`}
					style={
						!isOpen
							? {
									paddingRight: "2rem",
									paddingLeft: "2rem",
							  }
							: null
					}
				>
					<svg className={`${isOpen ? "small_svg mr-1" : "small_svg_1"} `}>
						<use xlinkHref={sprite + `#${icon}`} />
					</svg>
					{isOpen && (
						<p className='flexi gap-15'>
							<span className='heading_small  cap'> {title}</span>
							{count ? (
								<motion.span
									variants={scaleUp}
									initial={"initial"}
									animate={"final"}
									className='bg-or col-w dot center-flex smaller weit-3'
								>
									{count}
								</motion.span>
							) : null}
						</p>
					)}
				</a>
			</Link>
		</li>
	);
};

export default SidebarLink;
