import { graphql } from "gatsby";
import React from "react";
import FluidImage from "../../components/FluidImage";
import Header from "../../components/Header";
import { Layout } from "../../components/layout";
import RegistrationSection from "../../components/registration/RegistrationSection";

export default function AboutPage({
                                      data: { headerImage },
                                  }: {
    data: {
        headerImage: FluidImage;
    };
}): React.ReactElement {
    const name = "TESTMUN";
    const date = "January 1, 2021 to January 2, 2021"
    const key = "testMun2021"
    const donationAmount = 45;
    const defaultCommittees = [
        "Default One",
        "Default Two",
        "Default Three",
        "Default Four",
        "Default Five"
    ]
    const forms = [
        {
            name: "FUHSD Field Trip Form",
            key:"testmunFieldTripForm",
            url: "https://montavistamun.com/forms/FUHSD-field-trip-form.pdf",
            autofill: (memberName: any, data: any) => ({
                    "Student's Name": [memberName],
                    Destination: ["Online Model UN Conference (SCVMUN)"],
                    "Date(s)": ["1/29/21 - 1/30/21"],
                    "Depature Time": ["None (Virtual)"],
                    "Return Time": ["None (Virtual)"],
                    "Person in Charge": ["David Hartford"],
                    "Home Address": [
                        data.personalInformation.addressOne +
                        (data.personalInformation.addressTwo
                            ? ", " + data.personalInformation.addressTwo
                            : "") +
                        ", " +
                        data.personalInformation.city +
                        ", " +
                        data.personalInformation.state +
                        ", " +
                        data.personalInformation.zip,
                    ],
                    "Insurance Address": [
                        data.emergencyInformation.healthInsuranceAddressOne +
                        (data.emergencyInformation.healthInsuranceAddressTwo
                            ? ", " +
                            data.emergencyInformation
                                .healthInsuranceAddressTwo
                            : ""),
                    ],
                    "City/State": [
                        data.emergencyInformation.healthInsuranceCity +
                        ", " +
                        data.emergencyInformation.healthInsuranceState,
                    ],
                    Zip: [data.emergencyInformation.healthInsuranceZip],
                    "Family Health Insurance Carrier": [
                        data.emergencyInformation.healthInsuranceCarrier,
                    ],
                    "Policy Number": [
                        data.emergencyInformation.healthInsurancePolicyNumber,
                    ],
                    Telephone: [data.personalInformation.phone],
                    Language: [data.emergencyInformation.householdMainLanguage],
                    "Emergency Contact Name and Telephone": [
                        data.emergencyInformation.contactOneName +
                        ", " +
                        data.emergencyInformation.contactOnePhone,
                    ],
                }
            ),
        }
    ];
    return (
        <Layout
            title={`${name} Registration`}
            description={
                `Register for ${name}, a great conference for MUN beginners and veterans alike!`
            }
        >
            <div className="min-h-ca">
                <Header
                    title={`${name} Registration`}
                    backgroundImage={headerImage}
                >
                    {date}
                </Header>

                <RegistrationSection
                    name={name}
                    date={date}
                    key={key}
                    donationAmount={donationAmount}
                    defaultCommittees={defaultCommittees}
                    forms={forms}
                />
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
