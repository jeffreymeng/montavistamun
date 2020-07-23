import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import Img, { FixedObject } from "gatsby-image";
import HeroWithNav from "../components/index/HeroWithNav";
import About from "../components/index/About";
import Stats from "../components/index/Stats";
import CTA from "../components/index/CTA";
import Footer from "../components/Footer";
import classNames from "classnames";
function IndexPage({
	data,
}: {
	data: { socialsImage: { childImageSharp: { fixed: FixedObject } } };
}): React.ReactElement {
	console.log(data);
	const aboutRef = React.useRef(null);
	const [joinModalOpen, setJoinModalOpen] = React.useState(false);
	return (
		<Layout empty title={"Home"}>
			<HeroWithNav aboutRef={aboutRef} />
			<About aboutRef={aboutRef} />
			<Stats />
			<CTA />
			<Footer />
		</Layout>
	);
}

export default IndexPage;
