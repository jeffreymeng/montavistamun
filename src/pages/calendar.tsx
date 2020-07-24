import React from "react";
import Layout from "../components/layout";
import loadable from "@loadable/component";

const LoadableCalendar = loadable(() =>
	import("../components/calendar/LoadableCalendar")
);

export default function AboutPage(): React.ReactElement {
	return (
		<Layout title={"Calendar"}>
			<h1
				className={
					"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
				}
			>
				Calendar
			</h1>
			<p>
				You can follow our calendar by clicking{" "}
				<a
					href={
						"https://calendar.google.com/calendar/b/4?cid=ZzloNmNxaXNvOTY2ZTk2dXFqMWN2Mm9oZ2NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
					}
					target={"_blank"}
					rel={"noopener noreferrer"}
				>
					here
				</a>
				.
			</p>
			<LoadableCalendar />
		</Layout>
	);
}
