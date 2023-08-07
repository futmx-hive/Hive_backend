import React from "react";
import Field from "./Field";
import * as Yup from "yup";
import UseForm from "formconfigs/UseForm";

const linkSchema = Yup.object().shape({
	value: Yup.string().url("valid google docx or dropbox link").required("specify a valid link"),
});
export const linkSchema2 = Yup.object().shape({
	value: Yup.string()
		.url("valid google docx or dropbox link")
		.matches(/(http:\/\/)?(github|gitlab).com\/.+?\/.+/gi, "should be a valid github URL")
		.required("specify a valid link"),
});

function AddLinks({
	initialState = "",
	onAdd = () => null,
	label = "",
	placeholder = "dropbox,google doc e.tc link to your work",
	buttonText = "add",
	schema = linkSchema,
}) {
	const { onChange, formIsValid, resetForm, values, errors } = UseForm({ fields: { value: initialState } }, schema);
	const handleAdd = () => {
		onAdd(values["value"]);
		resetForm();
	};
	return (
		<div className='grid_1_max  gap-15'>
			<div className='grid_1_max  gap-15'>
				<Field
					label={label}
					placeholder={placeholder}
					value={values["value"]}
					error={values["value"] === "" ? "" : errors["value"]}
					handleChange={onChange}
					name='value'
				/>
			</div>
			<div className=''>
				<button
					onClick={handleAdd}
					type='button'
					className='btn_bord btn_med btn_pri_light tablet'
					disabled={!formIsValid}
				>
					{buttonText}
				</button>
			</div>
		</div>
	);
}

export default AddLinks;
