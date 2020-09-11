import React from "react";
import CTA from "../components/CTA";
import About from "../components/index/About";
import Hero2 from "../components/index/Hero2";
import Stats from "../components/index/Stats";
import { Layout } from "../components/layout";

function IndexPage(): React.ReactElement {
	const aboutRef = React.useRef(null);

	return (
		<Layout
			title={"Monta Vista Model United Nations"}
			navbarShadow="scroll"
			formatTitle={false}
		>
			<Hero2 aboutRef={aboutRef} />
			<About aboutRef={aboutRef} noTopDecorativeDots />
			<Stats />
			<CTA />
		</Layout>
	);
}

export default IndexPage;
