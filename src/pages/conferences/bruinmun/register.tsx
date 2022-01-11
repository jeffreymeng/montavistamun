import { graphql } from "gatsby";
import React from "react";
import FluidImage from "../../../components/FluidImage";
import Header from "../../../components/Header";
import { Layout } from "../../../components/layout";
import BruinMUNRegistrationSection from "../../../components/registration/BruinMUNRegistrationSection";

export default function AboutPage({
	data: { headerImage },
}: {
	data: {
		headerImage: FluidImage;
	};
}): React.ReactElement {
	return (
		<Layout
			title={"BruinMUN Registration"}
			description={
				"Register for BruinMUN, a great conference for MUN beginners and veterans alike!"
			}
		>
			<div className="min-h-ca">
				<Header
					title={"BruinMUN Registration"}
					backgroundImage={headerImage}
				>
					{"November 6-7, 2021"}
				</Header>

				<BruinMUNRegistrationSection />
			</div>
		</Layout>
	);
}

export const query = graphql`
	query {
		headerImage: file(relativePath: { eq: "conferences/bruinmun.jpeg" }) {
			childImageSharp {
				fluid(maxWidth: 1200, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;
