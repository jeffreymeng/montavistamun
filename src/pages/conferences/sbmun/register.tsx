import { graphql } from "gatsby";
import React from "react";
import FluidImage from "../../../components/FluidImage";
import Header from "../../../components/Header";
import { Layout } from "../../../components/layout";
import SBMUNRegistrationSection from "../../../components/registration/SBMUNRegistrationSection";

export default function AboutPage({
	data: { headerImage },
}: {
	data: {
		headerImage: FluidImage;
	};
}): React.ReactElement {
	return (
		<Layout
			title={"SBMUN Registration"}
			description={"Register for SBMUN!"}
		>
			<div className="min-h-ca">
				<Header
					title={"SBMUN Registration"}
					backgroundImage={headerImage}
				>
					{"April 3, 2021"}
				</Header>

				<SBMUNRegistrationSection />
			</div>
		</Layout>
	);
}

export const query = graphql`
	query {
		headerImage: file(relativePath: { eq: "conferences/bmun.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 1200, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;
