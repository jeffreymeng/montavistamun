import { graphql } from "gatsby";
import React from "react";
import FluidImage from "../../../components/FluidImage";
import Header from "../../../components/Header";
import { Layout } from "../../../components/layout";
import SCVMUN24RegistrationSection from "../../../components/registration/SCVMUN24RegistrationSection";

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
                    {"February 2-3, 2024"}
                </Header>

                { <SCVMUN24RegistrationSection /> }
            </div>
        </Layout>
    );
}

export const query = graphql`
	query {
		headerImage: file(relativePath: { eq: "conferences/scvmun.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 1200, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;
