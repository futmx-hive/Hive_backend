import React, { useEffect } from "react";
import { useState } from "react";
import SupervisorAndStudents from "../SupervisorAndStudents";
const names = ["Dr Abdulazzez Damilola", "Mrs Bilikisu", "Dr Zubairu", "Mr Calistus", "Dr Cosmos"];

function AssignmentBoard({ students }) {
	const [assignees, setAssignees] = useState([1, 2, 3]);
	const [error, setError] = useState("");
	const stringifiedStuds = JSON.stringify(students);
	useEffect(() => {
		console.log(students);
		try {
			setAssignees(randomlyAssign(students, names));
		} catch (error) {
			console.log(error);
			setError(
				<>
					invalid csv file please ensure that file has{" "}
					<span className='weit-3 upp'> name , exam_no, and matric_no </span> fields
				</>,
			);
		}
	}, [stringifiedStuds]);
	console.log(assignees);
	return error ? (
		<div className='bg-r p-2 col-w-1 '>
			<p>{error}</p>
		</div>
	) : (
		<div className='con_1_1_1'>
			{assignees &&
				assignees.map((assignee, index) => (
					<SupervisorAndStudents
						students={assignee.students || []}
						supervisor={{ name: assignee.supervisor_id }}
						key={assignee.supervisor_id}
					/>
				))}
		</div>
	);
}

export default AssignmentBoard;

function randomlyAssign(students, supervisors) {
	const assignees = [];

	for (let i = 0; i < students.length; i++) {
		let updated_student = students[i];
		let { matric_no, exam_no, name } = updated_student;
		const [first_name, last_name, ...rest] = name.split(" ");
		updated_student = {
			matric_no,
			exam_no,
			first_name,
			last_name: last_name + " " + rest.join(" "),
		};
		console.log(updated_student);
		let target = {
			supervisor_id: supervisors[i % supervisors.length],
			students: [],
		};
		let isNew = true;
		if (assignees[i % supervisors.length]) {
			target = assignees[i % supervisors.length];
			isNew = false;
		}

		target.students.push(updated_student);
		if (isNew) assignees.push(target);
	}

	return assignees;
}
