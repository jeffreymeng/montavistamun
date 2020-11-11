import { graphql } from "gatsby";
import React from "react";
import { RegistrationForm } from "../../components/conferences/registration";
import FluidImage from "../../components/FluidImage";
import Header from "../../components/Header";
import { Layout, Main } from "../../components/layout";

const data = {
	name: "SFMUN 2020",
	date: "January 2, 2020 to January 3, 2020",
};
export default function AboutPage({
	data: { headerImage },
}: {
	data: {
		headerImage: FluidImage;
	};
}): React.ReactElement {
	return (
		<Layout title={"404 Error"}>
			<Header
				title={data.name + " Registration"}
				backgroundImage={headerImage}
			>
				{data.date}
			</Header>
			<Main>
				<RegistrationForm />
			</Main>
		</Layout>
	);
}

export const query = graphql`
	query RegisterPageQuery {
		headerImage: file(relativePath: { eq: "conferences/smunc.jpeg" }) {
			childImageSharp {
				fluid(maxWidth: 1200, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;
