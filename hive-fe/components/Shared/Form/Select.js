import React, { Fragment, useRef, useState } from 'react';
import UseClickOutsideToclose from '../../../hooks/UseClickOutsideToclose';
import UseToogle from '../../../hooks/UseToogle';

function Select({
	multiple = false,
	add,
	initialOpen = false,
	label,
	name,
	onChange,
	short,
	placeholder,
	children,
	base,
	long = true,
	value,
	error,
}) {
	const { isOpen, close, toogle } = UseToogle(initialOpen);
	const { isOpen: isTouched, open: setIsTouched } = UseToogle(false);
	const ref = useRef();
	const { active, settActive } = useState(0);

	const handleChange = (val) => {
		if (!multiple) return onChange(val);

		const values = [...value];
		if (values.some((v) => v === val))
			return add({
				payload: {
					[name]: values.filter((e) => e !== val),
				},
			});

		add({
			payload: {
				[name]: [...values, val],
			},
		});
	};

	const errorText = () =>
		isTouched && error ? (
			<small style={{ marginTop: '7px' }} className={`error smaller weit-1 col-r weit-2`}>
				{error}
			</small>
		) : null;

	UseClickOutsideToclose(ref, () => {
		close();
		setIsTouched();
	});
	return (
		<div
			className='form_group'
			ref={ref}
			style={{
				minWidth: long ? '18rem' : '',
			}}>
			<label className='cap form_label col-bl weit-2'>{label}</label>
			<div className='form_select '>
				<div
					className={`form_select_title close br bg-w ${value ? 'bg-w' : ''}   `}
					onClick={() => toogle()}>
					{(value && !multiple) || value?.length === 1 ? (
						<span className='heading_small col-bl cap weit-1'>{value}</span>
					) : (
						<span className='pl'> {placeholder ? placeholder : 'e.g latest &nbsp;'}</span>
					)}
				</div>
				{errorText()}
				{isOpen && (
					<div className='basecard'>
						<ul
							className={`form_select_list open bg-w ${short ? 'short' : ''}`}
							onClick={(e) => {
								if (multiple) e.stopPropagation();
							}}>
							{!children ? (
								<Fragment>
									{
										<li
											className='form_select_option'
											onClick={() => {
												onChange('option' + 1);
												toogle();
											}}
											key={1}>
											<span> no options</span>
										</li>
									}
								</Fragment>
							) : !multiple ? (
								React.Children.map(children, (child, index) =>
									React.cloneElement(child, {
										...child.props,
										choosen: value === child.props.value || value === child.props.value,
										onChange: (v) => {
											handleChange(v);
											toogle();
										},
										key: index,
									}),
								)
							) : (
								value.length > -1 &&
								React.Children.map(children, (child, index) =>
									React.cloneElement(child, {
										...child.props,
										onChange: handleChange,
										checked: value.some(
											(v) => v.toLowerCase() === child.props.text.toLowerCase(),
										),
										key: index,
									}),
								)
							)}
							{base}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

export default Select;
