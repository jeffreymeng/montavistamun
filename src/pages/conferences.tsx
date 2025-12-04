import { graphql, navigate } from "gatsby";
import { FluidObject } from "gatsby-image/index";
import React, { useContext } from "react";
import conferencesData from "../components/conferences/ConferencesData";
import CTA from "../components/CTA";
import FluidImage from "../components/FluidImage";
import Header from "../components/Header";
import HorizontalCard from "../components/HorizontalCard";
import { Layout, Main } from "../components/layout";
import AuthContext from "../context/AuthContext";
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
	const { user } = useContext(AuthContext);

	const upcomingConferences = [
		{
			name: "GauchoMUN XVII",
			date: "January 24-25, 2025",
			location: "UC Santa Barbara",
			acronym: "gauchomun",
			text: "GauchoMUN XVII is a conference hosted at UC Santa Barbara. Join us for an exciting weekend of debate and diplomacy in beautiful Santa Barbara.",
		},
		{
			name: "Berkeley Model United Nations",
			date: "March 6-8, 2026",
			location: "UC Berkeley",
			acronym: "bmun",
			text: "BMUN is the oldest high school Model UN conference in the world. With over 2,000 delegates each year, it ranks among the premier high school conferences.",
		},
		{
			name: "TinoMUN",
			date: "Date TBD",
			location: "Cupertino High School",
			acronym: "tinomun",
			text: "TinoMUN is a local conference hosted by Cupertino High School. It's a great opportunity for delegates to practice their skills close to home.",
		},
		{
			name: "South Bay Model United Nations",
			date: "Date TBD",
			location: "Homestead High School",
			acronym: "sbmun",
			text: "South Bay Model United Nations is a spring conference in the Bay Area. It's a great chance to keep your MUN skills sharp late in the school year.",
		},
	];
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
				<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Conferences</h2>
					<div className="space-y-3">
						{upcomingConferences.map(({ name, date, location, acronym }, i) => (
							<div key={i} className="border-l-4 border-indigo-500 pl-4 py-2">
								<h3 className="font-semibold text-lg text-gray-900">
									{acronym.toUpperCase()}: {name}
								</h3>
								<p className="text-gray-600">
									{date} | {location}
								</p>
							</div>
						))}
					</div>
				</div>

				<h1 className={"text-3xl leading-7 font-extrabold mt-12 mb-6"}>
					Conference Details
				</h1>
				<p className="mt-3 text-lg">
					Model UN is best known for its conferences, which allow you to take
					advantage of the knowledge you gain from meetings as well as grow
					closer to other members. Especially for travel conferences,
					you are essentially going on a vacation with your favorite
					people (yes, Model UN is that fun) while putting your
					speaking and leadership skills to the test. Of course, you
					will also be able to participate in mock conferences before
					actual conferences to master conference etiquette and work
					out the kinks. We're sure you will have a great experience
					with conferences, and we hope you join us for our next one!
				</p>
				{conferencesData.map(
					(
						{
							name,
							date,
							location,
							acronym,
							text,
							registration,
							registrationText,
						},
						i
					) => {
						return (
							<HorizontalCard
								key={i}
								subtitle={`${date} | ${location}`}
								title={
									acronym == acronym.toLowerCase()
										? acronym.toUpperCase() + ": " + name
										: acronym + ": " + name
								}
								image={
									(images.find(
										(img) =>
											img[0].toLowerCase() ==
											acronym.toLowerCase()
									) || [null, images[0][1]])[1]
								}
								onButtonClick={() => {
									if (!registration) return;
									if (registration.indexOf("/") === 0) {
										navigate(registration);
									} else {
										window.location.href = registration;
									}
								}}
								buttonText={
									registration
										? `${
												registrationText ||
												"Registration Now Open"
										  }${(user || registration.indexOf("/") !== 0) ? "" : ": Login to Continue"}` // if logged in or the registration uses a google form don't display text
										: undefined
								}
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
