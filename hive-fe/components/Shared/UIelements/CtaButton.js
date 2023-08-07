import React from "react";
import SmallLoader from "../SmallComponents/SmallLoader";

const CtaButton = ({
	disabled = false,
	loading = false,
	loadingText = "processing...",
	scale = 0.4,
	onClick,
	text,
	design = "btn_pri tablet ",
	classes = "btn_wide  heading_small_1",
	buttonType = "button",
	showLoader = true,
	children,
}) => {
	return (
		<button
			onClick={onClick}
			className={`${classes}  ${loading ? "flexi js-center" : ""} ${design} gap-15`}
			disabled={loading || disabled}
			type={buttonType}
		>
			{loading && showLoader && <SmallLoader scale={scale} classes={"small"} />}
			<span style={{ whiteSpace: "nowrap" }}>{loading ? loadingText : text || children}</span>
		</button>
	);
};

export default CtaButton;
