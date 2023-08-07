import Sidebar from "../Shared/UIelements/Sidebar";
import { createContext } from "react";
import UseToogle from "@hooks/UseToogle";
import useResize from "@hooks/UseResize";

const DbrdCtx = createContext();
const DashboardLayout = ({ children, SidebarComponent = null }) => {
	const _ = UseToogle(true);
	const width = useResize();
	const sidebarData = [
		{
			title: "dashboard",
			icon: "dashboard",
			link: "dashboard",
		},
		{
			title: "pools",
			icon: "pools",
			link: "pools",
		},
		{
			title: "assignment",
			link: "assignment",
			icon: "assignment",
		},
		{
			name: "projects",

			items: [
				{
					title: "upload ",
					link: "projects/upload",
					icon: "upload_projects",
				},
				{
					title: "your projects",
					link: "projects",
					icon: "my_project",
				},
			],
		},
		{
			name: "roles",
			items: [
				{
					title: "members",
					link: "roles",
					icon: "assignees",
				},
			],
		},
		{
			title: "settings",
			icon: "settings",
			link: "settings/profile",
		},
	];
	return (
		<DbrdCtx.Provider value={{ _, width }}>
			<main className={`dashboard_layout ${_.isOpen && width < 1200 ? "auto" : ""}`}>
				{SidebarComponent ? <SidebarComponent /> : <Sidebar data={sidebarData} />}
				{children}
			</main>
		</DbrdCtx.Provider>
	);
};

export default DashboardLayout;
export { DbrdCtx };
