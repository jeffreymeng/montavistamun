import { graphql } from "gatsby";
import React from "react";
import FluidImage from "../components/FluidImage";
import Header from "../components/Header";
import HorizontalCard from "../components/HorizontalCard";
import { Layout, Main } from "../components/layout";

export default function ConferencesPage({
	data,
}: {
	data: {
		smunc: FluidImage;
		gmunc: FluidImage;
	};
}): React.ReactElement {
	return (
		<Layout title={"Conferences"}>
			<Header
				backgroundImage={
					"https://previews.123rf.com/images/annagolant/annagolant1612/annagolant161200049/70849730-orange-stripes-on-white-background-striped-diagonal-pattern-blue-diagonal-lines-background-winter-or.jpg"
				}
				title={"Conferences"}
			>
				Where the fun takes place. Anim aute id magna aliqua ad ad non
				deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
				amet fugiat veniam occaecat fugiat aliqua.
			</Header>
			<Main>
				{Array(4)
					.fill({
						name: "YAMUNC: Yet Another Model UN Conference",
						date: "January 1, 1970 - July 26, 2010",
						location: "Stanford University",
						image: data.smunc,
						text: `This will be the best experience of your life. Better than any other conference on this page. Lorem ipsum dolor
 sit amet, consectetur adipiscing elit, sed do eiusmod
 tempor incididunt ut labore et dolore magna aliqua. Ut
 enim ad minim veniam, quis nostrud exercitation ullamco
 laboris nisi ut aliquip ex ea commodo consequat.`,
					})
					.map(({ name, date, location, image, text }, i) => {
						return (
							<HorizontalCard
								key={i}
								subtitle={`${date} | ${location}`}
								title={name}
								image={image}
								buttonText={
									i === 2
										? "Registration Now Open: Login to Continue"
										: undefined
								}
							>
								{text}
							</HorizontalCard>
						);
					})}
			</Main>
		</Layout>
	);
}
export const query = graphql`
	query ConferencesPageQuery {
		gmunc: file(relativePath: { eq: "conferences/gmunc.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 960, quality: 100) {
					...GatsbyImageSharpFluid
				}
			}
		}
		smunc: file(relativePath: { eq: "conferences/smunc.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 960, quality: 100) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`;
