import React from 'react';
import Link from 'next/link';
const DropBtn = ({ text, onClick, classes, tag = '' }) => {
	return (
		<li className='dropdown_list_item'>
			{typeof onClick === 'string' ? (
				!!tag ? (
					<a
						href={onClick}
						target='_blank'
						rel='noreferrer'
						className={`dropdown_button cap heading_small_1 col-bl btn_txt  ${classes}`}>
						{text}
					</a>
				) : (
					<Link
						to={onClick}
						className={`dropdown_button cap heading_small_1 col-bl btn_txt  ${classes}`}>
						{text}
					</Link>
				)
			) : (
				<button onClick={onClick} className={`dropdown_button cap heading_small_1  ${classes}`}>
					{text}
				</button>
			)}
		</li>
	);
};

export default DropBtn;
