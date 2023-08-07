import GlobalContext from "context/GlobalContext";
import "../styles/main.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { InstantSearch, InstantSearchSSRProvider } from "react-instantsearch-hooks-web";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Hydrate } from "react-query";
import AuthProvider from "@components/Auth/context/AuthProvider";
import ToastProvider from "@shared/Toast/ToastProvider";
import ProjectsUploadProvider from "@components/Project/context/ProjectsUploadProvider";

// host: "xmoij38p5ebt19vyp-1.a1.typesense.net", // where xxx is the ClusterID of your Typesense Cloud cluster
// port: "443",
// protocol: "https",

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
	server: {
		nodes: [
			{
				host: process.env.NODE_ENV === "production" ? "yq1lcvtr9xihbm23p-1.a1.typesense.net" : "localhost", // For Typesense Cloud use xxx.a1.typesense.net
				port: process.env.NODE_ENV === "production" ? 443 : 8108, // For Typesense Cloud use 443
				protocol: process.env.NODE_ENV === "production" ? "https" : "http",
			},
		],
		apiKey: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_SEARCH_KEY : "xyz",
		connectionTimeoutSeconds: 20,
	},
	// The following parameters are directly passed to Typesense's search API endpoint.
	//  So you can pass any parameters supported by the search endpoint below.
	//  queryBy is required.
	additionalSearchParameters: {
		query_by: "title,owner_fullname,class",
	},
});

const client = new QueryClient();

function MyApp({ Component, pageProps, serverState }) {
	return (
		<ToastProvider>
			<QueryClientProvider client={client}>
				<AuthProvider>
					<ProjectsUploadProvider>
						<DndProvider backend={HTML5Backend}>
							<InstantSearchSSRProvider {...serverState}>
								<InstantSearch
									searchClient={typesenseInstantsearchAdapter.searchClient}
									indexName='project'
								>
									<GlobalContext>
										<Component {...pageProps} />
									</GlobalContext>
								</InstantSearch>
							</InstantSearchSSRProvider>
						</DndProvider>
					</ProjectsUploadProvider>
				</AuthProvider>
			</QueryClientProvider>
		</ToastProvider>
	);
}

export default MyApp;
