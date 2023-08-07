import { faker } from "@faker-js/faker";
import Card from "@sharedUi/Card";
import Faq from "@sharedUi/FaQ";
import LinkItem from "@sharedUi/LinkItem";
import React from "react";

export const submissionTypes = ["proposal", "chapter 1", "chapter 2", "chapter 3", "chapter 4", "chapter 5"];

function StudentSubmission({ submissionIndex = 0, mode = 0 }) {
	const comp = (
		<div className='flex-1 flexi sp-btw '>
			<h2 className='heading_med cap weit-2 col-col-gra-bt-d'>{submissionTypes[submissionIndex]}</h2>
			<span className='badge_bg badge_gr upp'> active</span>
		</div>
	);
	return (
		<Card>
			<Faq Component={comp} classes='bg-w'>
				<div className='grid_txt_2 p-3'>
					<p className='heading_small'>{faker.lorem.text()}</p>
					<h4 className='heading_med cap weit-2'>attachments</h4>
					<div className='flexi gap-25'>
						<LinkItem />
						<LinkItem />
						<LinkItem />
						<LinkItem />
					</div>
					{
						[
							<div className='flexi gap-25' key={"A"}>
								<button className='btn_med btn_pri  weit-1 tablet'> Approve submission</button>
								<button className='btn_med btn_bord col-r  weit-1 tablet'>
									{" "}
									Reject Submission
								</button>
							</div>,
							<div className='flex gap-15' key={"b"}>
								<button className='btn_med btn_pri  weit-1 tablet'> Edit</button>
								<button className='btn_med btn_bord col-r  weit-1 tablet'> delete</button>
							</div>,
						][mode]
					}
				</div>
			</Faq>
		</Card>
	);
}

export default StudentSubmission;
