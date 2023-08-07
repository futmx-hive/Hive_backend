import React from "react";
import _ from "./style.module.scss";
import Icon from "@shared/SmallComponents/Icon";
import StudentCard from "@sharedUi/StudentCard";
import Link from "next/link";
import { UseDownloadLink } from "@components/Project/services/project.queries";
import SmallLoader from "@shared/SmallComponents/SmallLoader";
function ProjectItem({ hit }) {
	const downloadLinkQ = UseDownloadLink(hit._id || hit.id);

	const getDocxViewLink = (linkToDocxHTML = "") => {
		return `projects/view?temp_url=${linkToDocxHTML}`;
	};
	return (
		<>
			<div className='flex'>
				<figure className={`${_.proj_img} br-1 mr-3 `}>
					<img src={hit.topic_img_url || "/photos/proj.png"} alt='some_thing' className='br-1' />
				</figure>
				<aside className='grid_txt_2'>
					<div className='flex-1'>
						<div className='grid_txt_2'>
							<h5 className='heading_med weit-2 cap'> {hit.title}</h5>
							<p className='heading_small weit-1 col-gra-bt-d'>{hit.description}</p>
						</div>
					</div>
					<div className=' mt-1'>
						<div className='flex gap-15'>
							{downloadLinkQ.isLoading ? (
								<div className='mr-2'>
									<SmallLoader scale={0.4} />
								</div>
							) : downloadLinkQ.data ? (
								<Link target='_blank' href={getDocxViewLink(downloadLinkQ.data.data.data)}>
									<a
										href={getDocxViewLink(downloadLinkQ.data.data.data)}
										target='_blank'
										rel='noreferrer'
										className='tiny-ci bg-pri round center-flex'
										disabled={downloadLinkQ.isLoading}
									>
										<Icon id={"#doc"} />
									</a>
								</Link>
							) : (
								<button
									className='btn_icon btn_small col-pri tablet btn_bord mr-3'
									onClick={() => downloadLinkQ.refetch()}
								>
									<span>retry </span>
									<Icon id={"#retry"} style={{ stroke: "red" }} />
								</button>
							)}

							<button className='tiny-ci bord-g-1 round'>
								<Icon id={"#code"} />
							</button>
							{Array.isArray(hit.cloned_code_repo_urls) &&
								hit.cloned_code_repo_urls.length > 0 &&
								hit.cloned_code_repo_urls.map((url, i) => (
									<Link target='_blank' key={i} href={url}>
										<a
											href={url}
											target='_blank'
											rel='noreferrer'
											className='tiny-ci bord-g-1 round center-flex'
										>
											<Icon id={"#git"} />
										</a>
									</Link>
								))}

							{Array.isArray(hit.cloned_code_repo_urls) &&
								hit.cloned_code_repo_urls.length > 0 &&
								hit.cloned_code_repo_urls.map((url, i) => {
									const ideLink = url
										.replace("github.com", "codesandbox.io/p/github")
										.replace(".git", "");

									return (
										<Link target='_blank' key={i} href={ideLink}>
											<a
												href={ideLink}
												target='_blank'
												rel='noreferrer'
												className='btn_icon btn_bord btn_small  col-pri tablet'
											>
												<Icon id={"#code"} />
												<span>view on IDE</span>
											</a>
										</Link>
									);
								})}
						</div>
					</div>
					<div className='flexi sp-btw gap-25'>
						<div className='flex-1'>
							<StudentCard
								name={hit.owner_fullname || ""}
								matricNo={hit.owner?.toUpperCase()}
								classes='bord-g-1 p-1 br'
							/>
						</div>
						<div className='u-right heading_med'>
							<span className='weit-1 cap col-gra-d'>{hit.supervisor}</span> &nbsp;
						</div>
					</div>
					<div className='u-right'>
						<h2 className='heading_small col-gra-l weit-3'>
							<span className='weit-1 cap'>{hit.month},</span> &nbsp;
							{hit.year}
						</h2>
					</div>
				</aside>
			</div>
		</>
	);
}

export default ProjectItem;
