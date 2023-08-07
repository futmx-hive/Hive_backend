import SearchBox from "@sharedUi/SearchBox";
import { useRouter } from "next/router";
import React, { useState } from "react";
import _ from "./style.module.scss";
import HeroBg from "./HeroBg";

function Hero() {
	const router = useRouter();
	const [search, setSearch] = useState("");
	return (
		<HeroBg>
			<div className=' fill center-flex'>
				<aside className='grid_txt_3 u-center'>
					<h1>School projects made accessible!</h1>
					<div className='p-x-4'>
						<form
							action=''
							onSubmit={(e) => {
								e.preventDefault();
								router.push(`/search?q=${search}`);
							}}
						>
							<SearchBox
								onChange={(txt) => setSearch(txt)}
								full
								classes='p-1'
								placeholder={"search projects"}
							/>
						</form>
					</div>
				</aside>
			</div>
		</HeroBg>
	);
}

export default Hero;
