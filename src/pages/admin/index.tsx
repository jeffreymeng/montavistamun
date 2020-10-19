import { Link } from "gatsby";
import React, { useState } from "react";
import useFirebase from "../../auth/useFirebase";
import AdminLayout from "../../components/layout/AdminLayout";
import AuthContext from "../../context/AuthContext";
export default function AdminHomePage(): React.ReactElement {
	const [target, setTarget] = useState("");
	const [admin, setAdmin] = useState("same");
	const [verified, setVerified] = useState("same");
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
		</AdminLayout>
	);
}
