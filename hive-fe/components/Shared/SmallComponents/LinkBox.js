import React from "react";
import Icon from "./Icon";
import Link from "next/link";

function LinkBox({ link = "", handleDelete = () => null }) {
	return (
		<Link href={link} target='_blank'>
			<a className='flexi sp-btw col-gra-d bg-w-1 bord-blu gap-15 br hidden'>
				<div className='p-1 bg-bl'>
					<Icon id={"#link"} />
				</div>

				<p className='heading_small flex-1' style={{ width: "70%" }}>
					{link}
				</p>
				<button
					type='button'
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						handleDelete();
					}}
					className='btn_txt btn_small'
				>
					remove
				</button>
			</a>
		</Link>
	);
}

export default LinkBox;
