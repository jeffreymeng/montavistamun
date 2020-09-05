import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image/index";
import React from "react";
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
		<Layout title={"Conferences"}>
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
				{[
					{
						name: "Gunn Model UN Conference",
						date: "October 24, 2020",
						location: "Henry M. Gunn High School",
						acronym: "gmunc",
						text: `Gunn Model United Nations Conference is our first conference of the year, and the one where we always take the most novices too. Fun fact: Monta Vista won the Best Delegation award at GMUNC for 3 years in a row!`,
					},
					{
						name: "Stanford Model UN Conference",
						date: "November 12, 2020 - November 15, 2020",
						location: "Stanford University",
						acronym: "smunc",
						text: `Our second conference of the year, Stanford Model United Nations Conference is a competitive one mainly for veterans and varsity members. SMUNC is an intensive 3 days full of 5 committee sessions that will leave you exhausted, but happy that you had such a good time!
`,
					},
					{
						name: "Silicon Valley Model United Nations Conference",
						date: "January 29, 2021 - January 30, 2021",
						location: "Santa Teresa High School",
						acronym: "scvmun",
						text:
							"Santa Clara Valley Model United Nations Conference is our third conference of the year, and the one where we recommend to all members – novice or veteran. Participating at SCVMUN is a great way to get used to more difficult conferences, such as SMUNC, NAIMUN, and BMUN.",
					},
					{
						name:
							"North American Invitational Model United Nations Conference",
						date: "February 11, 2021 - February 14, 2021",
						location: "Georgetown University",
						acronym: "naimun",
						text:
							" Often recognized as the most difficult conference of the year to many delegates, the North American Invitational Model United Nations Conference is an extremely challenging but thrilling experience. Though hard and tiring, we’re sure that you will enjoy meeting a lot of new people and making large improvements in your MUN abilities. NAIMUN is also our first overnight conference, located in Washington D.C., a 4-5 night stay and plane flight away.",
					},
					{
						name: "Berkeley Model United Nations Conference",
						date: "February 26, 2021 - February 28, 2021",
						location: "University of California, Berkeley",
						acronym: "bmun",
						text:
							"Our fifth conference of the year, Berkeley Model United Nations Conference, is meant for veterans and varsity members. BMUN is tough, but we’re sure that you will have such a great time meeting members from all over the world. It’s also a great way to analyze and practice your speech skills in a group of more experienced delegates. BMUN is our second overnight conference, located in nearby Berkeley, California, including a 2-night stay at a hotel in Berkeley.",
					},
					{
						name: "South Bay Model United Nations",
						date: "Date TBA", // TODO when available
						location: "Monta Vista High School",
						acronym: "sbmun",
						text:
							"South Bay Model United Nations Conference is our sixth conference of the year, and the one where students can continue practicing MUN skills with other delegates from the Bay Area. MUN conferences are rare in the spring season, so this is a great way for you to keep honing on your MUN abilities. ",
					},
					{
						name: "Davis Model United Nations Conference",
						date: "May 15, 2020 - May 16, 2020",
						location: "University of California, Davis",
						acronym: "dmunc",
						text:
							"Our final conference of the year, Davis Model United Nations Conference, is an excellent way for you to present your accumulated speech skills throughout the school year in one big committee. DMUNC has a variety of both novices and experienced members, and we’re sure that you will do great after practicing for so long! DMUNC is our last overnight conference, including a likely 2-night stay at a hotel near Davis Campus.",
					},
				].map(({ name, date, location, acronym, text }, i) => {
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
				})}
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
