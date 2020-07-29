import React from "react";
import { Layout } from "../../components/layout";
import AuthContext from "../../context/AuthContext";

export default function AboutPage(): React.ReactElement {
	const { user, loading, verified } = React.useContext(AuthContext);
	return (
		<Layout title={"Member Dashboard"}>
			{loading && <p>LOADING</p>}
			<h1
				className={
					"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
				}
			>
				Hi {user?.email}
			</h1>
			<p className={"mt-4 mb-20"}>Hi</p>
		</Layout>
	);
}
