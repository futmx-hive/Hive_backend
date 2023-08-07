import UseToggle from "@hooks/UseToogle";
import CheckBox from "@shared/SmallComponents/CheckBox";
import Modal from "@sharedUi/Modal";
import SearchBox from "@sharedUi/SearchBox";
import React from "react";
import FormAddMember from "../components/FormAddMember";
import RoleDisplay from "../components/RoleDisplay";

function RolesHome() {
	const toog = UseToggle();
	return (
		<section>
			<aside className='bg-w bord-bott-1 mb-3'>
				<div className='container'>
					<di className='grid_txt_2 p-y-2'>
						<article className='sp-btw gap-25 '>
							<SearchBox full placeholder={"find a member"} />
							<button className='btn_large btn_pri tablet' onClick={toog.open}>
								Add people
							</button>
						</article>
					</di>
				</div>
			</aside>

			<div className='container'>
				<article className='grid_txt_3'>
					<RoleDisplay />
					<RoleDisplay title='supervisors' />
				</article>
			</div>

			<Modal isOpen={toog.isOpen} close={toog.close}>
				<FormAddMember />
			</Modal>
		</section>
	);
}

export default RolesHome;
