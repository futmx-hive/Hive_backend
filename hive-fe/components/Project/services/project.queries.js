import { useQuery } from "@tanstack/react-query";
import { ProjectService } from "./project.services";

const DOC_LINK = "doc_link";

export function UseDownloadLink(docId) {
	return useQuery(
		[DOC_LINK, docId],
		({ queryKey: [key, docId] }) => {
			return ProjectService.getProjectDownloadLink(docId);
		},
		{
			staleTime: 60 * 1000 * 60,
			refetchOnWindowFocus: false,
			keepPreviousData: false,
			retry: false,
		},
	);
}
