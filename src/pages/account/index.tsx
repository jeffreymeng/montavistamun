import { navigate } from "gatsby";
import React from "react";
import { Layout, Main } from "../../components/layout";
export default function AboutPage(): React.ReactElement {
	navigate("/dashboard", { replace: true });
	React.useEffect(() => {
		navigate("/dashboard", { replace: true });
	}, []);
	return (
		<Layout title={"Loading"}>
			<Main>
				<h1
					className={
						"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
					}
				>
					Loading...
				</h1>
			</Main>
		</Layout>
	);
}
