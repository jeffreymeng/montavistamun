import { graphql } from "gatsby";
import React from "react";
import FluidImage from "../../components/FluidImage";
import Header from "../../components/Header";
import { Layout } from "../../components/layout";
import RegistrationSection from "../../components/registration2/RegistrationSection";

const data = {
	name: "SCVMUN 51",
	key: "scvmun51",
	date: "January 28, 2022 to January 29, 2022",
	forms: [
		{
			url: "/forms/FUHSD-field-trip-form.pdf",
			key:"fieldTripForm", // unique to the forms
			name:""
		},
	],
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
			<RegistrationSection name={data.name} key={data.key} />
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
