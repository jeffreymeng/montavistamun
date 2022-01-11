import { graphql } from "gatsby";
import React from "react";
import FluidImage from "../../../components/FluidImage";
import Header from "../../../components/Header";
import { Layout } from "../../../components/layout";
import SFMUN21RegistrationSection from "../../../components/registration/SFMUN21RegistrationSection";

export default function AboutPage({
	data: { headerImage },
}: {
	data: {
		headerImage: FluidImage;
	};
}): React.ReactElement {
	return (
		<Layout
			title={"SFMUN Registration"}
			description={
				"Register for SFMUN, our first in-person conference of the year!"
			}
		>
			<div className="min-h-ca">
				<Header
					title={"SFMUN Registration"}
					backgroundImage={headerImage}
				>
					{"December 11-12, 2021"}
				</Header>

				<SFMUN21RegistrationSection />
			</div>
		</Layout>
	);
}

export const query = graphql`
	query {
		headerImage: file(relativePath: { eq: "conferences/sfmun.jpeg" }) {
			childImageSharp {
				fluid(maxWidth: 1200, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;
