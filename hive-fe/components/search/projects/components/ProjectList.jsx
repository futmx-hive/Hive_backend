import React from "react";
import { Hits, useHits } from "react-instantsearch-hooks-web";
import ProjectItem from "./ProjectItem";
import ProjectPreview from "./ProjectPreview";
import _ from "./style.module.scss";
import FallbackBig from "@shared/Fallback/FallbackBig";
import { useRouter } from "next/router";
function ProjectList() {
	const hitsChunk = useHits();
	const r = useRouter();
	console.log(hitsChunk.hits);

	return (
		<>
			<ul className='mb-5'>
				<FallbackBig
					title={"no results found"}
					imgID={"#empty"}
					body={"seems you dont have projects matching this category"}
					footer={
						<div className='center-flex'>
							<button
								onClick={() => r.push("/projects/upload")}
								className='btn_large btn_bord  weit-1 tablet col-pri bg-w'
							>
								upload projects
							</button>
						</div>
					}
					isOpen={hitsChunk.hits.length}
				>
					{() => (
						<ul className={`${_.proj_list} br-1 bord-g-1 hidden`}>
							{hitsChunk.hits.map((hit, index) => (
								<li className='flexi p-3'>{<ProjectItem key={index} hit={hit} />}</li>
							))}
						</ul>
					)}
				</FallbackBig>
			</ul>
		</>
	);
}

export default ProjectList;
