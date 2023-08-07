import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import UseToggle from '@hooks/UseToogle';
import SmallLoader from '../SmallComponents/SmallLoader';

const PhoneField = ({
	autoFocus = true,
	label,
	onChange = () => null,
	c1,
	values,
	error,
	disabled = false,
	isSubmitting = false,
	customCode = '',
	id = '',
}) => {
	const { isOpen: touched, open: setTouched } = UseToggle(false);
	// const countryAbbr = localStore.getValueFromKey('country');
	const countryAbbr = 'ng';
	let cc;
	// const { data, isLoading } = UseCountries();
	const getCountryAbbr = (dialCode) =>
		data?.data?.countryDetailsList.find(({ phoneCode }) => phoneCode === dialCode);

	const handleChange = (value, country, e, formattedValue) => {
		const { dialCode } = country;
		const phone = value.replace(new RegExp(dialCode, 'i'), '');
		const selectedCountry = getCountryAbbr(dialCode);
		if (!selectedCountry) return;
		const { name, region, currency, capital, abbreviation, gmtOffset } = selectedCountry;
		const input = {
			countryCode: dialCode,
			phoneNumber: phone,
			country: {
				name,
				region,
				currency,
				capital,
				abbreviation,
				gmtOffset,
			},
		};
		// localStore.setKey('country', abbreviation);
		onChange(input);
	};
	// if (isLoading)
	// 	return (
	// 		<div className='u-center col-gra-l'>
	// 			<SmallLoader scale={0.4} />
	// 		</div>
	// 	);

	// if (customCode) {
	// 	cc = getCountryAbbr(customCode.slice(1))?.abbreviation.toLowerCase();
	// }

	return (
		<div className='form_group' id={id}>
			<label htmlFor={'phone'} className={'form_label  cap  col-bl ' + c1}>
				{label ? label : 'enter your phone number'}
			</label>

			<PhoneInput
				placeholder='enter your phone number'
				country={cc ? cc : countryAbbr ? countryAbbr.toLowerCase() : 'ng'}
				// countryCodeEditable={false}
				onlyCountries={['ng']}
				// disabled={isLoading || isSubmitting || disabled}
				onBlur={setTouched}
				onChange={handleChange}
				inputProps={{
					name: 'phone',
					required: true,
					autoFocus: autoFocus,
				}}
				inputClass='form_input'
				value={values || ''}
				inputStyle={{
					paddingTop: '2.3rem',
					paddingBottom: '2.3rem',
				}}
			/>
			{error && (
				<small className='smaller wet-2 col-r' style={{ marginTop: '8px' }}>
					{touched ? error : ''}
				</small>
			)}
		</div>
	);
};

export default PhoneField;
