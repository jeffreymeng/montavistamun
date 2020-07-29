import React from "react";
import { Layout } from "../components/layout";

export default function AboutPage(): React.ReactElement {
	return (
		<Layout title={"404 Error"}>
			<h1
				className={
					"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
				}
			>
				404 Error: Page Not Found
			</h1>
			<p className={"mt-4 mb-20"}>
				It looks like there isn&apos;t a page at this location. The page
				might have been moved, renamed, or deleted.
			</p>
		</Layout>
	);
}
