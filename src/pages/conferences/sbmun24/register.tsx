import { graphql } from "gatsby";
import React from "react";
import FluidImage from "../../../components/FluidImage";
import Header from "../../../components/Header";
import { Layout } from "../../../components/layout";
import SBMUN24RegistrationSection from "../../../components/registration/SBMUN24RegistrationSection";

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
					{"April 6, 2024"}
				</Header>
				
                <div className={"mt-10 mt-5 px-10 h-full"}>
                    <h1
                        className={
                            "text-xl font-semibold leading-6 text-gray-900"
                        }
                    >
                        SBMUN Registration is now closed. If you have any
                        questions, please email us at{" "}
                        <a
                            className={"link"}
                            href={"mailto:montavistamun@gmail.com"}
                        >
                            montavistamun@gmail.com
                        </a>
                        .
                    </h1>
                </div>
				{/*<SBMUN24RegistrationSection />*/}
			</div>
		</Layout>
	);
}

export const query = graphql`
	query {
		headerImage: file(relativePath: { eq: "headers/sbmun-registration.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 1200, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;
