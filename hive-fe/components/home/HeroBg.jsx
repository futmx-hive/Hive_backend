import React from "react";
import _ from "./style.module.scss";
export default function HeroBg({ children }) {
	return <section className={`${_.hero}`}>{children}</section>;
}
