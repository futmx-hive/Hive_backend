import DashboardLayout from "@layout/DashboardLayout";
import SpaceBottom from "@layout/SpaceBottom";
import TopNav from "@sharedUi/TopNav";
import React from "react";
import { HitsPerPage, SortBy } from "react-instantsearch-hooks-web";
import InstantSearchBox from "../components/InstantSearchBox";
import ProjectList from "../components/ProjectList";
import ProjectPreview from "../components/ProjectPreview";
import SearchSidebar from "../components/SearchSidebar";
import _ from "./style.module.scss";

function ProjectSearchHome() {
	return (
		<DashboardLayout SidebarComponent={SearchSidebar}>
			<div>
				<TopNav left={<InstantSearchBox />} classes=' container-lg' />
				<div className='container-lg'>
					<div className='flexi gap-25 mt-2 mb-1'>
						<HitsPerPage
							classNames={{
								select: "bg-w form_input br",
							}}
							items={[
								{ label: "10 hits per page", value: 20, default: true },
								{ label: "20 hits per page", value: 40 },
							]}
						/>
						<SortBy
							classNames={{
								select: "bg-w form_input br",
							}}
							items={[
								{ label: "Relevance", value: "project" },
								{ label: "year (asc)", value: "project" },
								{ label: "year (desc)", value: "project" },
							]}
						/>
					</div>
				</div>
				<div className={`${_.proj_search_layout}`}>
					<div className=' mt-5'>
						<ProjectList />
						{/* <ProjectPreview /> */}
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}

export default ProjectSearchHome;
