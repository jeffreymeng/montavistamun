import { graphql } from "gatsby";
import React from "react";
import FluidImage from "../../../components/FluidImage";
import Header from "../../../components/Header";
import { Layout } from "../../../components/layout";
import BMUNRegistrationSection from "../../../components/registration/BMUNRegistrationSection";

export default function AboutPage({
	data: { headerImage },
}: {
	data: {
		headerImage: FluidImage;
	};
}): React.ReactElement {
	return (
		<Layout
			title={"BMUN Registration"}
			description={
				"Register for BMUN, a great conference for MUN beginners and veterans alike!"
			}
		>
			<div className="min-h-ca">
				<Header
					title={"BMUN Registration"}
					backgroundImage={headerImage}
				>
					{"February 26-28, 2021"}
				</Header>

				<BMUNRegistrationSection />
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
