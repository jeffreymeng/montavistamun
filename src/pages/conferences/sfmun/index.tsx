import { graphql, Link } from "gatsby";
import React from "react";
import FluidImage from "../../../components/FluidImage";
import Header from "../../../components/Header";
import { Layout, Main } from "../../../components/layout";

export default function SFMUNPage({
	data,
}: {
	data: {
		headerImage: FluidImage;
	};
}): React.ReactElement {
	return (
		<Layout title={"SFMUN"}>
			<Header
				backgroundImage={data.headerImage}
				title={"San Fransisco Model United Nations"}
			>
				December 12, 2020 to December 13, 2020
			</Header>
			<Main>
				{/*<p>SFMUN Blurb Here</p>*/}
				{/*<p>*/}
				{/*	Also schedule, links to websites, important documents, etc.*/}
				{/*</p>*/}
				<p>
					<Link to={"/conferences/sfmun/register"} className="link">
						Register Here
					</Link>
				</p>
			</Main>
		</Layout>
	);
}

export const query = graphql`
	query SFMUNPageQuery {
		headerImage: file(relativePath: { eq: "conferences/sfmun.jpeg" }) {
			childImageSharp {
				fluid(maxWidth: 1200, quality: 90) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;
