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
					In-person conferences are back!
				</h1>
				<p className="mt-3 text-lg">
					Now that we’re in person, there is so much more we can do!
					Meetings will be more productive, training will be more
					efficient, and club operations will be smoother. Model UN is
					best known for its conferences, which allow you to take
					advantage of all the previous benefits as well as grow
					closer to other members. Especially for travel conferences,
					you are essentially going on a vacation with your favorite
					people (yes, Model UN is that fun) while putting your
					speaking and leadership skills to the test. Of course, you
					will also be able to participate in mock conferences before
					actual conferences to master conference etiquette and work
					out the kinks. We’re sure you will have a great experience
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
										  }${user ? "" : ": Login to Continue"}`
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
