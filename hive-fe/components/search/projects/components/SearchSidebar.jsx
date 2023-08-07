import Faq from "@sharedUi/FaQ";
import SidebarWrappar from "@sharedUi/SidebarWrappar";
import React from "react";
import { RangeInput, RefinementList, useRefinementList } from "react-instantsearch-hooks-web";
const RefinementClasses = {
	label: "flexi gap-15 mb-2 cur-p",
	labelText: "cap form_input_txt col-gra-d mr-auto ",
	checkbox: "chkbox",
	count: "tablet p-x-1 center-grid round heading_small col-gra-d bord-g-1 bg-w-1 p-y-mm",
};

const RangeInputClasses = {
	input: "form_input br-1",
	submit: "btn_med tablet btn_pri_light heading_med bord-g-1 cap",
	form: "flexi gap-15 wrap  js-center",
};
function SearchSidebar() {
	return (
		<SidebarWrappar>
			<ul className='grid_txt mt-4'>
				<Panel title={"year"}>
					<RefinementList classNames={RefinementClasses} attribute={"year"} showMore={true} />
				</Panel>
				<Panel title={"year range"}>
					<RangeInput
						classNames={RangeInputClasses}
						min={2015}
						attribute='year'
						max={new Date().getFullYear() + 1}
						precision={0}
						translations={{
							submitButtonText: "preview",
						}}
					/>
				</Panel>
				<Panel title={"month"}>
					<RefinementList classNames={RefinementClasses} attribute={"month"} showMore={true} />
				</Panel>
			</ul>
		</SidebarWrappar>
	);
}

export default SearchSidebar;

function Panel({ title, children }) {
	return (
		<ul className='grid_txt_1'>
			<li className='sidebar_item_heading heading_small cap bord-bott-1 col-g '>
				<span className='ml-2 block pb-1'> {title}</span>
			</li>
			<li className='ml-2 mr-2 grid_txt_1'>{children}</li>
		</ul>
	);
}
