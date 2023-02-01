import { Types } from "joi";

export interface studentPoolObj {
	exam_num: string;

	first_name: string;

	last_name: string;

	matric_no?: string;
}

export interface supervisorStudents {
	supervisor_id: Types.ObjectId;

	students: studentPoolObj[];
}
export type degreeType = "undergraduate" | "masters" | "phd";
export interface pool {
	year: number;
	students_type: degreeType;
	creator: Types.ObjectId;
	create_non_existent_students: boolean;
	assignees: supervisorStudents[];
	description: string;
}
