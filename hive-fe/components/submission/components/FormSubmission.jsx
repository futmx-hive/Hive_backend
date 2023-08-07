import Card from "@sharedUi/Card";
import React from "react";
import Field from "@form-components/Field";
import Select2 from "@form-components/Select2";
import { submissionTypes } from "@components/students/components/StudentSubmission";
import CtaButton from "@sharedUi/CtaButton";
import Submission from "@components/submission/services/submission.service";

import { submissionSchema } from "../models/schema";

import UseForm from "formconfigs/UseForm";
import { useSubmitChapters } from "@components/submission/services/submission.queries";
import AddLinks from "@form-components/AddLinks";
import LinkBox from "@shared/SmallComponents/LinkBox";

const data = submissionTypes.map((e, i) => ({
	label: e,
	value: i,
}));

const initialState = {
	fields: {
		submission_type: 0,
		description: "",
		links: [],
	},
};

function FormSubmission() {
	const submissionM = useSubmitChapters();
	const { values, errors, onChange, formIsValid, deleteFieldArray } = UseForm(initialState, submissionSchema);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(values);

		const data = {
			...values,
			submission_type: Number(values["submission_type"]),
		};
		// const response = await submissionM.mutate(data);
	};

	return (
		<div className='container-c583'>
			<Card xtraClassNames={"p-3 mt-4"}>
				<form action='' className='form_pkg'>
					<Select2
						label={"submission type"}
						placeholder={"what part of your project are you submitting"}
						options={data}
						value={
							values["submission_type"] > -1
								? {
										value: values["submission_type"],
										label: data.find((e) => e.value == values["submission_type"]).label,
								  }
								: null
						}
						name='submission_type'
						handleChange={onChange}
						error={errors["submission_type"]}
					/>

					<Field
						value={values["description"]}
						error={errors["description"]}
						label={"description"}
						placeholder={"briefly infform your supervisor about this submission"}
						typeOfField={"textarea"}
						name='description'
						handleChange={onChange}
					/>

					{values["links"].map((link, i) => (
						<LinkBox
							key={i}
							link={link}
							handleDelete={() =>
								deleteFieldArray({
									name: "links",
									index: i,
								})
							}
						/>
					))}

					<AddLinks
						onAdd={(value) =>
							onChange({
								name: "links",
								payload: value,
							})
						}
					/>
					<CtaButton disabled={!formIsValid} onClick={handleSubmit}>
						submit
					</CtaButton>
				</form>
			</Card>
		</div>
	);
}

export default FormSubmission;
