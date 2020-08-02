import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image";
import React from "react";
import { useKonamiCode } from "use-konami-code";
import FluidImage from "../components/FluidImage";
import Header from "../components/Header";
import HorizontalCard from "../components/HorizontalCard";
import { Layout, Main } from "../components/layout";
import secretariatData from "../components/secretariat/secretariatData";

export default function AboutPage({
	data,
}: {
	data: {
		placeholder: FluidImage;
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
	console.log(data);

	const images: [string, FluidImage][] = data.images.edges.map((edge) => [
		edge.node.name,
		{ childImageSharp: edge.node.image },
	]);
	const memeMode =
		typeof window === "undefined"
			? false
			: window.location.hash === "#memes";
	React.useEffect(() => {
		useKonamiCode(
			() => {
				window.location.hash = "#memes";
			},
			() => null
		);
	}, []);
	return (
		<Layout title={"Secretariat"}>
			<Header
				title={"Secretariat"}
				backgroundImage={
					"https://previews.123rf.com/images/annagolant/annagolant1612/annagolant161200049/70849730-orange-stripes-on-white-background-striped-diagonal-pattern-blue-diagonal-lines-background-winter-or.jpg"
				}
			>
				Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
				lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
				fugiat aliqua.
			</Header>
			<Main>
				{secretariatData.map(
					({ name, position, bio, memeBio, memeBioNickname }) => (
						<HorizontalCard
							subtitle={position}
							title={
								memeMode
									? `${
											name.split(" ")[0]
									  } "${memeBioNickname}" ${name
											.split(" ")
											.slice(1)
											.join(" ")}`
									: name
							}
							key={name}
							image={
								(images.find(
									(img) =>
										img[0].toLowerCase() ==
										name.toLowerCase().replace(/\s/g, "_")
								) || [null, data.placeholder])[1]
							}
						>
							{memeMode ? memeBio : bio}
						</HorizontalCard>
					)
				)}
				{memeMode && (
					<div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5">
						<div className="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
							<div className="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3">
								<div className="flex items-center justify-between flex-wrap">
									<div className="w-0 flex-1 flex items-center">
										<p className="ml-3 font-medium text-white truncate">
											<span className="md:hidden">
												Currently Displaying Meme Bios
											</span>
											<span className="hidden md:inline">
												You&apos;ve activated meme bios
												by typing in the{" "}
												<a
													href={
														"https://en.wikipedia.org/wiki/Konami_Code"
													}
													target={"_blank"}
													rel={"noopener noreferrer"}
													className={"underline"}
												>
													Konami Code
												</a>{" "}
												or using the{" "}
												<a
													href={"/secretariat#memes"}
													className={"underline"}
												>
													direct link
												</a>
												.
											</span>
										</p>
									</div>
									<div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
										<div className="rounded-md shadow-sm">
											<a
												href="#"
												className="flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150"
											>
												Back
											</a>
										</div>
									</div>
									<div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2 sm:hidden">
										<div
											className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 transition ease-in-out duration-150"
											aria-label="Dismiss"
										></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</Main>
		</Layout>
	);
}

export const query = graphql`
	query SecretariatPageQuery {
		placeholder: file(relativePath: { eq: "secretariat/placeholder.png" }) {
			childImageSharp {
				fluid(maxWidth: 960, quality: 100) {
					...GatsbyImageSharpFluid
				}
			}
		}
		images: allFile(
			filter: {
				relativePath: { glob: "secretariat/*.{jpg,jpeg,png,gif}" }
			}
		) {
			edges {
				node {
					name
					image: childImageSharp {
						fluid(maxWidth: 1920, quality: 90) {
							...GatsbyImageSharpFluid_withWebp
						}
					}
				}
			}
		}
	}
`;
