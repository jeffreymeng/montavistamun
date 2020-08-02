import React from "react";
import About from "../components/index/About";
import CTA from "../components/index/CTA";
import Hero from "../components/index/Hero";
import Stats from "../components/index/Stats";
import { Layout } from "../components/layout";

function IndexPage(): React.ReactElement {
	const aboutRef = React.useRef(null);
	const joinRef = React.useRef(null);

	return (
		<Layout lightFooter title={"Home"} navbarShadow="always">
			<Hero aboutRef={aboutRef} joinRef={joinRef} />
			<About aboutRef={aboutRef} />
			<Stats />
			<CTA joinRef={joinRef} />
		</Layout>
	);
}

export default IndexPage;
