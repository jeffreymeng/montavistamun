import React from "react";
import { Layout, Main } from "../../../components/layout";

export default function AboutPage(): React.ReactElement {
	return (
		<Layout title={"BMUN Registration"}>
			<Main>
				<h1
					className={
						"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
					}
				>
					BMUN Registration
				</h1>
				<p className={"mt-4 mb-20"}>{/* TODO */}</p>
			</Main>
		</Layout>
	);
}
