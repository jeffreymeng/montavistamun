import { Link } from "gatsby";
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
export default function AdminHomePage(): React.ReactElement {
	return (
		<AdminLayout title={"Admin Dashboard"}>
			<h1
				className={
					"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-6"
				}
			>
				Admin Dashboard
			</h1>
			<p>
				<Link to={"/admin/members"} className={"link"}>
					Manage Members
				</Link>
			</p>
			<p>
				<Link to={"/admin/awards"} className={"link"}>
					Edit Awards
				</Link>
			</p>
			<p>
				<Link to={"/admin/conference-registration"} className={"link"}>
					Conference Registration
				</Link>
			</p>
			<p>
				<Link to={"/admin/member-statistics"} className={"link"}>
					Member Statistics
				</Link>
			</p>
			<p>
				<Link to={"/admin/logs"} className={"link"}>
					Admin Logs
				</Link>
			</p>
		</AdminLayout>
	);
}
