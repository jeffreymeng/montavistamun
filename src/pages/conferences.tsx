import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image/index";
import React from "react";
import conferencesData from "../components/conferences/ConferencesData";
import CTA from "../components/CTA";
import FluidImage from "../components/FluidImage";
import Header from "../components/Header";
import HorizontalCard from "../components/HorizontalCard";
import { Layout, Main } from "../components/layout";
export default function ConferencesPage({
	data,
}: {
	data: {
		headerImage: FluidImage;
		images: {
			edges: {
				node: {
					name: string;
					image: {
						fluid: FluidObject;
					};
				};
			}[];
		};
	};
}): React.ReactElement {
	const images: [string, FluidImage][] = data.images.edges.map((edge) => [
		edge.node.name,
		{ childImageSharp: edge.node.image },
	]);
	return (
		<Layout
			title={"Conferences"}
			description={
				"MV Model UN's conferences offer excellent opportunities to hone your " +
				"skills with your peers — all while having a blast!"
			}
		>
			<Header backgroundImage={data.headerImage} title={"Conferences"}>
				Our conferences offer excellent opportunities to hone your
				skills with your peers — all while having a blast!
			</Header>
			<Main>
				<h1 className={"text-3xl leading-9 font-extrabold"}>
					A special note about online conferences
				</h1>
				<p className="text-lg mt-3">
					As the world adapts to life amid a global pandemic, we’re
					adapting as well. That’s why we’re overhauling our approach
					to teaching Model UN as many conferences transition to an
					online format, and why we’re working hard to organize our
					own online mock conferences while ensuring you receive the
					most complete MUN experience possible.
				</p>
				{conferencesData.map(
					({ name, date, location, acronym, text }, i) => {
						return (
							<HorizontalCard
								key={i}
								subtitle={`${date} | ${location}`}
								title={acronym.toUpperCase() + ": " + name}
								image={
									(images.find(
										(img) =>
											img[0].toLowerCase() ==
											acronym.toLowerCase()
									) || [null, images[0][1]])[1]
								}
								// buttonText={
								// 	i === 2
								// 		? "Registration Now Open: Login to Continue"
								// 		: undefined
								// }
								// TODO: when a conference comes up
							>
								{text}
							</HorizontalCard>
						);
					}
				)}
				<CTA />
			</Main>
		</Layout>
	);
}
export const query = graphql`
	query ConferencesPageQuery {
		headerImage: file(relativePath: { eq: "headers/conferences.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 1200, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
		images: allFile(
			filter: {
				relativePath: { glob: "conferences/*.{jpg,jpeg,png,gif}" }
			}
		) {
			edges {
				node {
					name
					image: childImageSharp {
						fluid(maxWidth: 800, quality: 75) {
							...GatsbyImageSharpFluid_withWebp
						}
					}
				}
			}
		}
	}
`;
