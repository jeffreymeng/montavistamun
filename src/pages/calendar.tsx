import React from "react";
import Layout from "../components/layout";
import loadable from "@loadable/component";

const LoadableCalendar = loadable(() =>
	import("../components/calendar/LoadableCalendar")
);

export default function AboutPage(): React.ReactElement {
	return (
		<Layout title={"Calendar"}>
			<LoadableCalendar />
		</Layout>
	);
}
