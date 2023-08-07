import Field from "@form-components/CommoDityInput";
import PhoneField from "@form-components/PhoneField";
import UseToggle from "@hooks/UseToogle";
import CtaButton from "@sharedUi/CtaButton";
import _ from "../style.module.scss";

function FormProfile() {
	const passwordFormToog = UseToggle();
	return (
		<>
			<section className={`${_.settings_box}`}>
				<form className='form_pkg'>
					<div className='form_grid_2'>
						<Field autoFocus label={"first name"} placeholder={"elon"} />
						<Field label={"last name"} placeholder={"musk"} />
					</div>
					<Field type={"email"} label='email' placeholder={"eleon@tesla.com"} />

					<PhoneField label='phone number' autoFocus={false} />

					<aside className={`flexi js-end gap-25 ${_.form_prof_base}`}>
						<CtaButton>save changes</CtaButton>
					</aside>
				</form>
			</section>
		</>
	);
}

export default FormProfile;
