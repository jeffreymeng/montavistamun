import loadable from "@loadable/component";
import React from "react";
import { Layout } from "../components/layout";

const LoadableCalendar = loadable(
	() => import("../components/calendar/LoadableCalendar"),
	{
		fallback: <p>Loading the latest events just for you...</p>,
	}
);

export default function AboutPage(): React.ReactElement {
	console.log(LoadableCalendar);
	return (
		<Layout
			title={"Calendar"}
			wrapperClassName={
				"flex-1 w-full px-4 py-8 md:px-20 mx-auto md:px-8 md:py-16"
			}
		>
			<h1
				className={
					"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
				}
			>
				Calendar
			</h1>
			<p className={"my-3"}>
				You can add our calendar to your own google calendar by clicking{" "}
				<a
					className={"underline text-blue-500 "}
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
			<div className={"w-full"}>
				<LoadableCalendar />
			</div>
		</Layout>
	);
}
