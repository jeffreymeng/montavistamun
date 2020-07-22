import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import Img, { FixedObject } from "gatsby-image";
import HeroWithNav from "../components/index/HeroWithNav";
import About from "../components/index/About";
import Stats from "../components/index/Stats";
import Newsletter from "../components/index/Newsletter";
import Footer from "../components/Footer";
function IndexPage({
	data,
}: {
	data: { socialsImage: { childImageSharp: { fixed: FixedObject } } };
}): React.ReactElement {
	console.log(data);
	const aboutRef = React.useRef(null);

	return (
		<Layout empty title={"Home"}>
			<HeroWithNav aboutRef={aboutRef} />
			<About aboutRef={aboutRef} />
			<Stats />
			<Newsletter />
			<Footer />
		</Layout>
	);
}

export default IndexPage;
