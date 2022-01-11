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
			key: "fieldTripForm", // unique to the forms
			name: "FUHSD Field Trip Form",
			autofill: {
				"Student's Name": "$FNAME $LNAME",
				Destination: "Online Model UN Conference (SCVMUN)",
				"Date(s)": "1/29/21 - 1/30/21",
				"Depature Time": "None (Virtual)",
				"Return Time": "None (Virtual)",
				"Person in Charge": "David Hartford",
				"Home Address":
					"$HOME_ADDR_STREET, $HOME_ADDR_CITY, $HOME_ADDR_STATE, $HOME_ADDR_ZIP",
				"Insurance Address": "$INSURANCE_ADDR_STREET",
				"City/State": "$INSURANCE_ADDR_CITY, $INSURANCE_ADDR_STATE",
				Zip: "$INSURANCE_ADDR_ZIP",
				"Family Health Insurance Carrier": "$INSURANCE_CARRIER",
				"Policy Number": "$INSURANCE_POLICY_NUMBER",
				Telephone: "$PHONE",
				Language: "$HOME_LANGUAGE",
				"Emergency Contact Name and Telephone":
					"$CONTACT_ONE_NAME   $CONTACT_ONE_PHONE",
			},
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
