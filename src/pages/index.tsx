import React from "react";

import { Layout, Footer, SEO } from "../components/layout";
import Img, { FixedObject } from "gatsby-image";
import HeroWithNav from "../components/index/HeroWithNav";
import About from "../components/index/About";
import Stats from "../components/index/Stats";
import CTA from "../components/index/CTA";

function IndexPage(): React.ReactElement {
	const aboutRef = React.useRef(null);
	const joinRef = React.useRef(null);

	return (
		<Layout empty title={"Home"}>
			<HeroWithNav aboutRef={aboutRef} joinRef={joinRef} />
			<About aboutRef={aboutRef} />
			<Stats />
			<CTA joinRef={joinRef} />
			<Footer />
		</Layout>
	);
}

export default IndexPage;
