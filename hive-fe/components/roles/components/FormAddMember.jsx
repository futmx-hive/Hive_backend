import CloseBtn from "@shared/SmallComponents/CloseBtn";
import Icon from "@shared/SmallComponents/Icon";
import Card from "@sharedUi/Card";
import CtaButton from "@sharedUi/CtaButton";
import SearchBox from "@sharedUi/SearchBox";
import React from "react";
import Select2 from "@form-components/Select2";
import OnAndOffBtn from "@shared/SmallComponents/OnAndOffBtn";

function FormAddMember({ classes = "container-c718", close }) {
	return (
		<Card xtraClassNames={`pos-r p-3 ${classes}`} stop>
			<CloseBtn close={close} />
			<div className='grid_txt_3'>
				<div className='center-grid grid_txt_2 mt-3'>
					<Icon id={"#add_user"} classes='avg_svg' />
					<h4 className='heading_med weit-2'>Assign a role to member</h4>
				</div>
				<form action='' className='form_pkg'>
					<SearchBox full placeholder={"search user by name or email"} />
					<Select2 placeholder={"choose role"} />
					<div className='flexi gap-15 '>
						<OnAndOffBtn name={"lock"} />
						<label htmlFor='lock' className='heading_md col-bl'>
							{" "}
							send them an email
						</label>
					</div>
					<CtaButton>assign </CtaButton>
				</form>
			</div>
		</Card>
	);
}

export default FormAddMember;
