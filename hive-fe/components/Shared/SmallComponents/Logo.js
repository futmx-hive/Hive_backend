import React from "react";
import Icon from "./Icon";

function Logo({ id = "#logo" }) {
	return <Icon id={id} classes='sidebar_logo cur-p' />;
}

export default Logo;
