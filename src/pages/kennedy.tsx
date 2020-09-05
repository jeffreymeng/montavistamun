import { graphql } from "gatsby";
import React from "react";
import FluidImage from "../components/FluidImage";
import Header from "../components/Header";
import { Layout } from "../components/layout";

export default function KennedyPage({
	data,
}: {
	data: {
		headerImage: FluidImage;
	};
}): React.ReactElement {
	return (
		<Layout title={"Kennedy MUN"}>
			<div className="min-h-ca">
				<Header
					backgroundImage={data.headerImage}
					title={"Kennedy Model UN"}
				>
					MV Model UN has a middle school division for students at
					Kennedy Middle School! It's the best way to get started with
					Model UN.
				</Header>
				<div className={"w-full max-w-4xl mx-auto py-8 px-4 md:px-8"}>
					<div>
						<h2 className="text-2xl leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9">
							Conferences
						</h2>
						<div className="mt-3">
							<p className="text-lg leading-7 text-gray-500">
								The Monta Vista Model UN Team brings it's middle
								school division to a variety of conferences such
								as the Santa Clara Valley Invitational held
								annually in January. Over 1,000 delegates across
								schools on the west coast compete in rigorous
								policy and debate on a number of pressing and
								relevant issues. In addition, we attend SBMUN
								(Monta Vista's very own conference!) and SFMUN!
							</p>
						</div>
					</div>
					<div className="bg-gray-200 rounded">
						<div className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:py-8 lg:px-8 lg:flex lg:items-center lg:justify-between my-8">
							<h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
								Sound Fun?
								<br />
								<span className="text-indigo-600">
									Join Kennedy MUN today
								</span>
							</h2>
							<div className="mt-8 flex lg:flex-shrink-0 lg:mt-0">
								<div className="inline-flex rounded-md shadow">
									<a
										href="https://docs.google.com/forms/d/e/1FAIpQLSfvnloHZsjPOq8w7iRCRADJ9U6SDqcfyMylgehKO0bGMu0aIA/viewform"
										target={"_blank"}
										rel={"noopener noreferrer"}
										className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
									>
										Join Today
									</a>
								</div>
							</div>
						</div>
					</div>
					<div>
						<h2 className="text-2xl leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9">
							Contact Us
						</h2>
						<div className="mt-3">
							<p className="text-lg leading-7 text-gray-500">
								We're always here to help. Just send us an email
								at{" "}
								<a
									href={"mailto:jfkennedymun@gmail.com"}
									className={"link"}
								>
									jfkennedymun@gmail.com
								</a>
								.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
export const query = graphql`
	query KennedyPageQuery {
		headerImage: file(relativePath: { eq: "headers/conferences.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 1200, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;
