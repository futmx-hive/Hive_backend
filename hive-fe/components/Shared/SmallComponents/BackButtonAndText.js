import React from "react";
import Link from "next/link";
import Icon from "./Icon";
import { useRouter } from "next/router";

const BackButtonAndText = ({ text, to, onClick }) => {
	const router = useRouter();
	const svg = <Icon id={"#goback"} />;
	let content = (
		<>
			{svg}
			<span className='heading_tiny weit-2'>back</span>
		</>
	);
	return (
		<div className='flexi gap-15 mb-1 mt-2'>
			{to ? (
				<Link href={to}>
					<a href='' className='btn_icon gap-15'>
						{content}
					</a>
				</Link>
			) : (
				<button
					type='button'
					className='btn_icon col-bl flexi gap-15'
					onClick={onClick ? onClick : router.back}
				>
					{content}
				</button>
			)}
			{text && <h3 className='heading_med col-bl cap'> {text}</h3>}
		</div>
	);
};

export default BackButtonAndText;
