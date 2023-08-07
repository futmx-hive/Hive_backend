import React, { Fragment, useMemo } from "react";
import UseToggle from "../../../hooks/UseToogle";

const Field = ({
	autoFocus = false,
	type,
	placeholder,
	supportingText,
	label,
	disabled,
	error,
	name,
	typeOfField,
	rows,
	handleChange,
	badge,
	supportingContent,
	classes = "grid_1_max",
	fieldStyles = {},
	showError = true,
	value,
	index = null,
	dataAddon = "",
	tempVal = "",
}) => {
	const { isOpen: isTouched, open: setIsTouched } = UseToggle(false);
	const sc = useMemo(() => supportingContent, [tempVal]);
	const firstCap = (txt) => (txt ? txt.replace(/^\w/, (e) => e.toUpperCase()) : null);
	const errorText = () =>
		isTouched && error && showError ? (
			<small style={{ marginTop: "7px", fontWeight: 500 }} className={`error small weit-1 col-r `}>
				{firstCap(error)}
			</small>
		) : null;

	const handleUpdate = (e) => {
		const { value } = e.target;
		if (disabled) return;
		if (index === null) return handleChange({ name, index: undefined, payload: value });
		handleChange({ name, index, payload: value });
	};
	const element = !typeOfField ? (
		<Fragment>
			<div
				className={`pos-r ${!dataAddon ? "no_addon" : ""}  ${
					!!badge || !!supportingContent ? "form_input_pack br-1 grid_1_max" : classes
				}`}
				data-addon={dataAddon}
				// font share
			>
				<input
					className={`form_input br-1 ${type === "tel" ? "tel" : ""} `}
					type={type}
					placeholder={firstCap(placeholder)}
					label={label}
					value={value}
					readOnly={disabled}
					onBlur={() => setIsTouched()}
					onChange={handleUpdate}
					autoFocus={autoFocus}
					disabled={disabled}
					name={name}
					style={{
						paddingLeft: dataAddon ? `${dataAddon.length + 2}ch` : "",
						...fieldStyles,
					}}
				/>
				{!!badge && (
					<div
						className={`form_input_badge center-flex upp weit-2 ${error && isTouched ? "error" : ""}`}
					>
						{badge}
					</div>
				)}
				{!!supportingContent &&
					React.cloneElement(sc, {
						...sc.props,
						isTouched,
						error,
					})}
			</div>
			{errorText()}
		</Fragment>
	) : (
		<Fragment>
			<textarea
				className='form_input br-1'
				type={type}
				value={value}
				placeholder={placeholder}
				label={label}
				disabled={disabled}
				onBlur={setIsTouched}
				onChange={handleUpdate}
				name={name}
				cols='30'
				rows={rows ? rows : 17}
			/>
			{errorText()}
		</Fragment>
	);

	return (
		<React.Fragment>
			<div className={`form_group ${error && isTouched ? " error" : ""}`}>
				{label && (
					<label htmlFor={name} className='form_label open  cap '>
						{label}
					</label>
				)}
				{typeOfField ? errorText : null}
				{!!supportingText && (
					<small className='small col-gra-l' style={{ display: "inline-block", marginBottom: ".5rem" }}>
						{supportingText}
					</small>
				)}
				{element}
			</div>
		</React.Fragment>
	);
};

export default Field;
