import HeadText from "@components/Auth/Components/HeadText";
import UseToggle from "@hooks/UseToogle";
import CtaButton from "@sharedUi/CtaButton";
import { useRouter } from "next/router";
import React, { useState, useEffect, Fragment, useCallback } from "react";
import Single from "./Single";

const OtpField = ({ onSuccess, isSubmitting, base = <></>, header = <></> }) => {
	const [value, setvalue] = useState(new Array(6).fill(""));
	const [count, setCount] = useState(-1);
	const { isOpen: error, toogle: setError, close: offError } = UseToggle(false);

	const updateValue = (val, index) => {
		let newValue, del;
		if (val === "") del = true;

		newValue = [...value];
		newValue[index] = val;

		for (let i = 0; i < index; i++) {
			if (newValue[i] === "") {
				newValue[i] = val;
				newValue[index] = "";
				setvalue(newValue);
				return;
			}
		}

		setvalue(newValue);
		if (del) {
			if (count >= 0) setCount(count - 1);
		}
		if (!del && count + 1 < value.length - 1) setCount(count + 1);

		if (!newValue.some((e) => e === "" || e === " ")) {
			offError();
			onSuccess(newValue.join(""));
		}
	};

	return (
		<Fragment>
			<div className='confirm_form grid_txt_2'>
				{header}
				<form
					onSubmit={function verifyOTP() {
						onSuccess();
					}}
				>
					<div>
						<div className='confirm_form_pack'>
							{value.map((v, index) => (
								<Single
									value={v}
									changeHandler={(val) => updateValue(val, index)}
									setCount={setCount}
									index={index}
									key={index}
									count={count}
									id={index}
									error={error}
									disabled={isSubmitting}
								/>
							))}
						</div>
					</div>
				</form>
				{base}
			</div>
		</Fragment>
	);
};

export default OtpField;
