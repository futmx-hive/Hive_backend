import Faq from "@sharedUi/FaQ";
import StudentCard from "@sharedUi/StudentCard";
import React from "react";

function SupervisorAndStudents({ supervisor = {}, students = [] }) {
	const heading = <h5 className='heading_med weit-1 col-g cap'> {supervisor.name}</h5>;
	return (
		<Faq Component={heading} openClasses={"bord-g-1 br"}>
			{students.map((stud, index) => (
				<StudentCard key={stud.exam_no} name={stud.first_name + " " + stud.last_name} />
			))}
		</Faq>
	);
}

export default SupervisorAndStudents;
