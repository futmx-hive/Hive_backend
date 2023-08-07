import Icon from "@shared/SmallComponents/Icon";
import { useRouter } from "next/router";
import React from "react";
import { SearchBox } from "react-instantsearch-hooks-web";

function InstantSearchBox() {
	const q = useRouter();

	console.log(q.query?.q);
	return q.isReady ? (
		<SearchBox
			placeholder='Search for project ideas'
			searchAsYouType={false}
			autoFocus
			classNames={{
				root: "flex-1 mr-4",
				form: "form_input br-1 flexi gap-15 ",
				input: "form_input_txt flex-1",
				submitIcon: "tiny-svg",
			}}
			defaultValue={q.query?.q || ""}
			submitIconComponent={({ classNames }) => <Icon id={"#search"} />}
		/>
	) : (
		<></>
	);
}

export default InstantSearchBox;
