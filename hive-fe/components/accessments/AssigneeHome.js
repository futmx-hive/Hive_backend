import StudentSubmission from "@components/students/components/StudentSubmission";
import BasicFilter from "@form-components/BasicFilter";
import Card from "@sharedUi/Card";
import StudentCard from "@sharedUi/StudentCard";
import { years } from "@utils/index";
import _ from "./style.module.scss";

console.log(years);

function AssigneeHome() {
	return (
		<section>
			<div className='container'>
				<div className='con_4_1 mt-3'>
					<BasicFilter />
				</div>
			</div>

			<div className='container  pos-r'>
				<div className={`con_2_4 al-start ${_.assignee_sub_pack}`}>
					<Card xtraClassNames={"pos-st"}>
						<div className='grid_txt_2 p-2'>
							<h4 className='heading_med_1 cap'>Student names</h4>
							<aside>
								<div className='grid_txt '>
									<StudentCard classes={"bord-g-1 p-1"} />
									<StudentCard classes={"bord-g-1 p-1"} />
									<StudentCard classes={"bord-g-1 p-1"} />
									<StudentCard classes={"bord-g-1 p-1"} />
								</div>
							</aside>
						</div>
					</Card>
					<div className='grid_txt_2'>
						{[...Array(6).keys()].map((e, i) => (
							<StudentSubmission key={i} submissionIndex={i} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default AssigneeHome;
