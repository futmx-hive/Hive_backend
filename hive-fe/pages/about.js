import MemberList from "@components/About/MemberList";
import Header from "@components/home/Header";
import HeroBg from "@components/home/HeroBg";
import SpaceBottom from "@layout/SpaceBottom";
import React from "react";

const teamMembers = [
	{
		src: "/1.jpg",
		name: "Guma",
	},
	{
		src: "/2.png",
		name: "Abdull",
	},
	{
		src: "/3.png",
		name: "Great",
	},
	{
		src: "/4.png",
		name: "Joe",
	},
];
const supervisors = [
	{
		src: "/5.webp",
		name: "Dr. E.F Aminu",
	},
];

function About() {
	return (
		<SpaceBottom>
			<Header />
			<HeroBg>
				<div className='container-c718 '>
					<div className='p-2 ' style={{ paddingTop: "200px" }}>
						<div className='grid_txt_3'>
							<div className='grid_txt_2'>
								<h5 className='team col-pri heading_med_2'>Students</h5>
								<MemberList data={teamMembers} />
							</div>
							<div className='grid_txt_2 heading_med_2'>
								<div className='u-center'>
									<h5 className='team col-pri'>Supervised by</h5>
								</div>
								<MemberList data={supervisors} />
							</div>
						</div>
					</div>
				</div>
			</HeroBg>
		</SpaceBottom>
	);
}

export default About;
