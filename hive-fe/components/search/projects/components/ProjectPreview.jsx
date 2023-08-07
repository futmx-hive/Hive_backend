import CloseBtn from "@shared/SmallComponents/CloseBtn";
import React from "react";
import _ from "./style.module.scss";
function ProjectPreview() {
	return (
		<aside className={`bg-w br p-x-3 pb-3 pos-st bord-g-1 ${_.proj_preview}`}>
			<CloseBtn />
			<section className='grid_txt_3'>
				<div className=' bord-bott-1 pb-2 pt-2'>
					<h5 className='heading_med_1 weit-2 cap'>Project archiving system</h5>
					<div className='flexi-force gap-15 mt-2'>
						<button className='btn_small tablet btn_bord btn_gray_2'>full doc</button>
						<button className='btn_small tablet btn_bord btn_pri'>view app</button>
					</div>
				</div>

				<div className='grid_txt_2'>
					<h6 className='heading_med col-col-gra-d upp'> abstract</h6>

					<p className='heading_med weit-1 col-gra-bt-d'>
						A project archive refers to the systematic storing of project artifacts (e.g., project
						charter, working documents, models, deliverables, etc.) at the close of a project.
						Retaining project documents and artifacts is important for administrative closure.
					</p>
				</div>
			</section>
		</aside>
	);
}

export default ProjectPreview;
