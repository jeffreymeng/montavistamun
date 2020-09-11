import React from "react";
import CTA from "../components/CTA";
import About from "../components/index/About";
import Hero from "../components/index/Hero";
import Stats from "../components/index/Stats";
import { Layout } from "../components/layout";

function IndexPage(): React.ReactElement {
	const aboutRef = React.useRef(null);

	return (
		<Layout
			title={"Monta Vista Model United Nations"}
			navbarShadow="always"
			formatTitle={false}
		>
			<Hero aboutRef={aboutRef} />
			<About aboutRef={aboutRef} />
			<Stats />
			<CTA />
		</Layout>
	);
}

export default IndexPage;
