import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image/index";
import React, { useRef } from "react";
import FluidImage from "../components/FluidImage";
import Header from "../components/Header";
import HorizontalCard from "../components/HorizontalCard";
import secretariatData from "../components/kennedy/secretariatData";
import { Layout } from "../components/layout";

export default function KennedyPage({
	data,
}: {
	data: {
		headerImage: FluidImage;
		placeholder: FluidImage;
		secretariatImages: {
			edges: {
				node: {
					name: string;
					image: {
						fluid: FluidObject;
					};
				};
			}[];
		};
		conferencesImages: {
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
	const secretariatImages: [
		string,
		FluidImage
	][] = data.secretariatImages.edges.map((edge) => [
		edge.node.name,
		{ childImageSharp: edge.node.image },
	]);
	const conferencesImages: [
		string,
		FluidImage
	][] = data.conferencesImages.edges.map((edge) => [
		edge.node.name,
		{ childImageSharp: edge.node.image },
	]);
	const conferencesRef = useRef(null);
	const description = `MV Model UN has a middle school division for students at Kennedy Middle School! It's the best way to get started with Model UN.`;
	return (
		<Layout title={"Kennedy MUN"} description={description}>
			<div className="min-h-ca">
				<Header
					backgroundImage={data.headerImage}
					title={"Kennedy Model UN"}
					buttons={
						<div className="mt-8 flex justify-center">
							<div className="inline-flex rounded-md shadow">
								<a
									href="https://docs.google.com/forms/d/e/1FAIpQLSfvnloHZsjPOq8w7iRCRADJ9U6SDqcfyMylgehKO0bGMu0aIA/viewform"
									target={"_blank"}
									rel={"noopener noreferrer"}
									className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
								>
									Get started
								</a>
							</div>
							<div className="ml-3 inline-flex">
								<button
									onClick={() =>
										conferencesRef &&
										// eslint-disable-next-line @typescript-eslint/ban-ts-comment
										// @ts-ignore
										conferencesRef.current.scrollIntoView({
											behavior: "smooth",
										})
									}
									className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline focus:border-indigo-300 transition duration-150 ease-in-out"
								>
									Learn more
								</button>
							</div>
						</div>
					}
				>
					{description}
				</Header>
				<div ref={conferencesRef} className={"w-full h-16"} />
				<div className={"w-full max-w-4xl mx-auto py-8 px-4 md:px-8"}>
					<div>
						<h2 className="text-2xl leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9">
							For Parents
						</h2>
						<div className="mt-3">
							<p className="text-lg leading-7 text-gray-500">
								Learn about the benefits of having your child
								join Kennedy Model United Nations by viewing our
								parent night slideshow{" "}
								<a
									href="https://docs.google.com/presentation/d/1wh4F4UCcyLTXC2N9L6UZkoLxfCKx5xlYvsd9fNigEsM/edit#slide=id.g35f391192_00"
									className="link"
									target={"_blank"}
									rel={"noopener noreferrer"}
								>
									here
								</a>
								.
							</p>
						</div>
						<h2 className="mt-5 text-2xl leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9">
							Conferences
						</h2>
						<div className="mt-3">
							<p className="text-lg leading-7 text-gray-500">
								The Monta Vista Model UN team brings its middle
								school division to a variety of conferences
								which allow its delegates to compete in rigorous
								policy and debate on a number of pressing and
								relevant issues. It's a fun and exciting way to
								apply the skills you've learned!
							</p>
							{[
								{
									name: "San Fransisco Model United Nations",
									date:
										"December 12, 2020 - December 13, 2020",
									location: "Lowell High School",
									acronym: "sfmun",
									text:
										"SFMUN is our first conference of the year, held in San Fransisco. SFMUN's smaller committee sizes make it a very beginner friendly conference, and serves as the perfect way to hop into MUN.",
								},
								{
									name:
										"Silicon Valley Model United Nations Conference",
									date: "January 29, 2021 - January 30, 2021",
									location: "Santa Teresa High School",
									acronym: "scvmun",
									text:
										"Santa Clara Valley Model United Nations Conference is our largest conference of the year!  At SCVMUN, over 1,000 delegates across schools on the west coast compete in rigorous policy and debate on a number of pressing and relevant issues.",
								},
								{
									name: "South Bay Model United Nations",
									date: "Date TBA", // TODO when available
									location: "Monta Vista High School",
									acronym: "sbmun",
									text:
										"South Bay Model United Nations Conference is Monta Vista's very own conference! It offers delegates the opportunity to continue practicing MUN skills with other delegates from the Bay Area. MUN conferences are rare in the spring season, so this is a great way for you to keep honing on your MUN abilities.",
								},
							].map(
								(
									{
										name,
										date,
										location,
										acronym,
										text,
										registrationLink,
										registrationDeadline,
									},
									i
								) => {
									return (
										<HorizontalCard
											key={i}
											subtitle={`${date} | ${location}`}
											title={
												acronym.toUpperCase() +
												": " +
												name
											}
											image={
												(conferencesImages.find(
													(img) =>
														img[0].toLowerCase() ==
														acronym.toLowerCase()
												) || [
													null,
													conferencesImages[0][1],
												])[1]
											}
											buttonText={
												registrationLink
													? `Register Now${
															registrationDeadline
																? ` (Deadline: ${registrationDeadline})`
																: ""
													  }`
													: undefined
											}
											buttonLink={registrationLink}
										>
											{text}
										</HorizontalCard>
									);
								}
							)}
						</div>
					</div>
					<div className="bg-gray-200 rounded mb-6">
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
							Kennedy Team
						</h2>
						<p className="text-lg leading-7 text-gray-500">
							We're always here to help. If you'd like to contact
							us, just email us at{" "}
							<a
								href={"mailto:jfkennedymun@gmail.com"}
								className={"link"}
							>
								jfkennedymun@gmail.com
							</a>
							.
						</p>
						<div>
							{secretariatData.map(({ position, name, bio }) => (
								<HorizontalCard
									key={name}
									subtitle={position}
									title={name}
									image={
										(secretariatImages.find((img) => {
											return (
												img[0].toLowerCase() ==
												name
													.toLowerCase()
													.replace(/\s/g, "_")
											);
										}) || [null, data.placeholder])[1]
									}
								>
									{bio}
								</HorizontalCard>
							))}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
export const query = graphql`
	query KennedyPageQuery {
		headerImage: file(relativePath: { eq: "headers/kennedy.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 1200, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
		placeholder: file(relativePath: { eq: "secretariat/placeholder.png" }) {
			childImageSharp {
				fluid(maxWidth: 960, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
		secretariatImages: allFile(
			filter: {
				relativePath: { glob: "secretariat/*.{jpg,jpeg,png,gif}" }
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
		conferencesImages: allFile(
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
