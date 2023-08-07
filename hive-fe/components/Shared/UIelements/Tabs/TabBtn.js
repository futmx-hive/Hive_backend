import React, { useContext } from "react";
import Link from "next/link";
import TabCtx from "./TabCtx";
import { TAB_DESIGNS } from "./Tabs";
const TabBtn = ({ design, label, id, link = null, isPrev, children, xtraClassNames = "" }) => {
	const tabHandler = useContext(TabCtx);
	const classes = design !== TAB_DESIGNS.BUTTON ? "btn_tab" : `btn_tab_big weit-2 col-bl ${isPrev && "prev"} `;
	const style = { flex: !design ? 1 : "" };
	const activeClass = tabHandler.value === id ? "active" : "";

	return link ? (
		<Link href={`/${link}`} style={style}>
			<a className={`${classes} ${xtraClassNames} ${window.location.pathname === "/" + link ? "active" : ""}`}>
				{children ? children : label}
			</a>
		</Link>
	) : (
		<button
			onClick={() => tabHandler.onChange(id)}
			className={`${classes} ${activeClass} ${xtraClassNames} `}
			style={style}
		>
			{children ? children : label}
		</button>
	);
};

export default TabBtn;
