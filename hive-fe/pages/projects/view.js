import UseToggle from "@hooks/UseToogle";
import SpaceBottom from "@layout/SpaceBottom";
import FallbackBig from "@shared/Fallback/FallbackBig";
import Loader from "@shared/Fallback/Loader";
import Logo from "@shared/SmallComponents/Logo";
import Card from "@sharedUi/Card";
import TopNav from "@sharedUi/TopNav";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

const url =
	"https://storage.googleapis.com/hive-3b806.appspot.com/projects/2023/undergraduate/12715a8a-aeb5-4bfd-bdce-63e981ba002a?GoogleAccessId=firebase-adminsdk-dyd3e%40hive-3b806.iam.gserviceaccount.com&Expires=1691332740&Signature=EBNKo0pCoNMz30nJocSgAKJg6dPRmiq6WlAeg%2BD%2BCbUFWDWeCVpJuGfvKKApj5RtS%2FfjdD%2FKxMW5Y7nk0ZCk1KExLntN%2FIt46sKJMcHicnnoCd289ohQbv2oFa1Ty0OqElp69FNqKmZJcRZZ%2BXDtUitB5lvkhzb2hV4amj%2BAQzPxciZPilBZyC41RQorjvLF%2F20PltjpOkiUGdqgzPx9az6AZSNekJ0N6cex6GNIEE9ZS244SkD%2B%2FzLej1EeIQM1HhGEOGRtBzGdN7qkw7VrkeM%2B%2B0FNBlIATmtgeiIIcmPy%2F0gQaYHnbfXo%2BjFlC7OeVEJkgG0GjEalhzYZdQhbcg%3D%3D&response-content-type=text%2Fhtml&response-content-disposition=inline";

function upload() {
	const ref = useRef();
	const router = useRouter();

	const temp_url = router.query?.temp_url;
	const { isLoading, data, isError, refetch } = useQuery(["__?>>_+"], {
		queryFn: async () => {
			return await axios.get(`/api/markup?temp_url=${temp_url}`);
		},
		enabled: !!temp_url,
		cacheTime: Infinity,
		staleTime: Infinity,

		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});

	const chunk = data?.data;

	useEffect(() => {
		if (ref.current) {
			for (let i = 1; i < ref.current.children.length; i++) {
				const node = ref.current.children[i];
				if (node.children) {
					if (node.textContent.trim() === "" || (i < 4 && /cover page/i.test(node.textContent))) {
						ref.current.removeChild(node);
					}
				}
			}
		}
	}, [chunk]);
	return (
		<SpaceBottom>
			<Card xtraClassNames='p-y-2 pos-st' style={{ top: "0" }}>
				<div className='container'>
					<Logo />
				</div>
			</Card>
			<div style={{ maxWidth: "1200px" }} className=' m-auto mt-5'>
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
								try again
							</button>
						</div>
					}
					loading={isLoading}
					LoadingComp={
						<Loader
							loading={isLoading}
							isError={isError}
							retry={refetch}
							errorMsg={{ message: "failed to get new orders" }}
						/>
					}
					isOpen={!isError && !!data}
				>
					{() => (
						<Card>
							<div
								ref={ref}
								className='markup_bowow p-5'
								dangerouslySetInnerHTML={{
									__html: `<div class="head"></div>` + data.data,
								}}
							></div>
						</Card>
					)}
				</FallbackBig>
			</div>
		</SpaceBottom>
	);
}

export default upload;
