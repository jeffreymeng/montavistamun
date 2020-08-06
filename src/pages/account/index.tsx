import React from "react";
import useRequireLogin from "../../components/accounts/useRequireLogin";
import { Layout, Main } from "../../components/layout";
import AuthContext from "../../context/AuthContext";

export default function AboutPage(): React.ReactElement {
	const { user, loading, verified } = React.useContext(AuthContext);
	useRequireLogin();

	return (
		<Layout title={"Member Dashboard"}>
			<Main>
				{loading && <p>Loading...</p>}
				<h1
					className={
						"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
					}
				>
					Hi {user?.displayName}
				</h1>
			</Main>
		</Layout>
	);
}
