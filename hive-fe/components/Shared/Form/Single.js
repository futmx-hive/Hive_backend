import React, { useEffect, useRef } from "react";

const Single = ({ name, count, id, value, changeHandler, size = 1, setCount, index, error }) => {
	const myref = useRef();

	useEffect(() => {
		if (myref.current && count + 1 === index) {
			myref.current.select();
		}
	}, [count]);

	return (
		<input
			ref={myref}
			className={` form_input_single heading_lg weit-1 u-center br  ${error ? "error" : ""}`}
			placeholder='0'
			type='text'
			name={name}
			id={id}
			size={size}
			onFocus={() => setCount(index - 1)}
			value={value}
			maxLength={1}
			onKeyUp={(e) => {
				if (/backspace/i.test(e.key)) {
					changeHandler("");
				}
			}}
			onChange={(e) => {
				if (e.target.value.trim()) changeHandler(e.target.value.trim());
			}}
		/>
	);
};

export default Single;
