import React from "react";
import _ from "./style.module.scss";
import Member from "./Member";
export default function MemberList({ data }) {
	return <div className='div_4'>{Array.isArray(data) && data.map((item, id) => <Member key={id} {...item} />)}</div>;
}
