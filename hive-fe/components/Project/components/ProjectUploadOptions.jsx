import Card from "@sharedUi/Card";
import React from "react";
import Select2 from "@form-components/Select2";
import OnAndOffBtn from "@shared/SmallComponents/OnAndOffBtn";
import CtaButton from "@sharedUi/CtaButton";
import { projectTypes } from "../models/schema";
import { useProjectUploadContext } from "../context/ProjectsUploadProvider";

const options = projectTypes.map((e, i) => ({
	label: e,
	value: i,
}));

function ProjectUploadOptions({ handleUpload, loading }) {
	const { projectUploadFormChunk, haandleReset, loadToog } = useProjectUploadContext();
	const { values, errors, onChange, formIsValid } = projectUploadFormChunk;
	return (
		<Card xtraClassNames={"p-3 br-1 pos-st"}>
			<div className='form_pkg'>
				<h6 className='form_heading u-center'>upload options</h6>
				<Select2
					label={"type of project"}
					options={options}
					handleChange={onChange}
					name={"category"}
					value={options[values["category"]]}
					error={errors["category"]}
				/>

				<div className='flexi gap-15'>
					<OnAndOffBtn
						name={"lock"}
						on={values["approve_all"]}
						onChange={(v) =>
							onChange({
								name: "approve_all",
								payload: v,
							})
						}
					/>
					<label htmlFor='lock' className='heading_md col-gra-bt-d '>
						Approve all
					</label>
				</div>

				<div className='mt-1 grid_txt_2'>
					<CtaButton disabled={!formIsValid || loading} onClick={handleUpload} loading={loading}>
						upload
					</CtaButton>
					<button
						disabled={loadToog.isOpen}
						className='btn_bord col-r btn_large tablet'
						onClick={haandleReset}
					>
						cancel
					</button>
				</div>
			</div>
		</Card>
	);
}

export default ProjectUploadOptions;
