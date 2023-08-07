import * as Yup from "yup";
export const submissionSchema = Yup.object().shape({
	submission_type: Yup.number("specify submission type").required("choose sub,mission type"),
	description: Yup.string().min(10).required("description is required"),
	links: Yup.array()
		.min(1)
		.of(
			Yup.string()
				.url("valid google docx or dropbox link")
				.required("specify a link to the file for this submission"),
		),
});
