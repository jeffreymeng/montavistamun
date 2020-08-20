import { Link } from "gatsby";
import React from "react";
import useFirebase from "../../auth/useFirebase";
import AdminLayout from "../../components/layout/AdminLayout";
import AuthContext from "../../context/AuthContext";
export default function AboutPage(): React.ReactElement {
	const [target, setTarget] = React.useState("");
	const [admin, setAdmin] = React.useState("same");
	const [verified, setVerified] = React.useState("same");
	const firebase = useFirebase();
	const {
		user,
		loading,
		verified: userVerified,
		admin: userAdmin,
	} = React.useContext(AuthContext);
	return (
		<AdminLayout title={"Admin Dashboard"}>
			<h1
				className={
					"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 mb-6"
				}
			>
				Admin Dashboard
			</h1>
			<Link to={"/admin/members"} className={"link"}>
				Manage Members
			</Link>
		</AdminLayout>
	);
}
