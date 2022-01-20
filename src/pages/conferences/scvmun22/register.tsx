import { graphql } from "gatsby";
import React from "react";
import FluidImage from "../../../components/FluidImage";
import Header from "../../../components/Header";
import { Layout } from "../../../components/layout";
import SCVMUN22RegistrationSection from "../../../components/registration/SCVMUN22RegistrationSection";

export default function AboutPage({
                                      data: { headerImage },
                                  }: {
    data: {
        headerImage: FluidImage;
    };
}): React.ReactElement {
    return (
        <Layout
            title={"SCVMUN Registration"}
            description={
                "Register for SCVMUN, a great conference for MUN beginners and veterans alike!"
            }
        >
            <div className="min-h-ca">
                <Header
                    title={"SCVMUN Registration"}
                    backgroundImage={headerImage}
                >
                    {"Janurary 28-29, 2022"}
                </Header>

                <SCVMUN22RegistrationSection />
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
