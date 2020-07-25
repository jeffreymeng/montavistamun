import React from "react";
import Layout from "../components/layout";
import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import FluidImage from "../components/FluidImage";
export default function ConferencesPage({
	data,
}: {
	data: {
		smunc: FluidImage;
		gmunc: FluidImage;
	};
}): React.ReactElement {
	return (
		<Layout title={"About"} wrapperClassName={"w-screen"}>
			<h1
				className={
					"text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
				}
			>
				Conferences (this header will be styled soon)
			</h1>
			<div className="relative bg-gray-800">
				<div className="h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2 bg-indigo-800">
					<Img
						className="w-full h-full object-cover opacity-90"
						fluid={data.smunc.childImageSharp.fluid}
						alt="Support team"
					/>
				</div>
				<div className="relative max-w-screen-xl mx-auto px-4 pt-12 pb-12 sm:px-6 lg:px-8 lg:pt-16 lg:pb-24">
					<div className="md:ml-auto md:w-1/2 md:pl-10">
						<div className="text-base leading-6 font-semibold uppercase tracking-wider text-gray-300">
							January 1, 1970 - July 26, 2010
						</div>
						<h2 className="mt-2 text-white text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10">
							Gunn Model United Nations Conference
						</h2>
						<p className="mt-3 text-lg leading-7 text-gray-300">
							Wow this is such a cool conference. Lorem ipsum
							dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna
							aliqua. Ut enim ad minim veniam, quis nostrud
							exercitation ullamco laboris nisi ut aliquip ex ea
							commodo consequat.
						</p>
					</div>
				</div>
			</div>
			<div className="relative bg-gray-50">
				<div className="h-56 bg-indigo-600 sm:h-72 md:absolute md:right-0 md:h-full md:w-1/2 bg-indigo-800">
					<Img
						className="w-full h-full object-cover opacity-90"
						fluid={data.smunc.childImageSharp.fluid}
						alt="Support team"
					/>
				</div>
				<div className="relative max-w-screen-xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
					<div className="md:mr-auto md:w-1/2 md:pr-10">
						<div className="text-base leading-6 font-semibold uppercase tracking-wider text-gray-800">
							January 1, 1970 - July 26, 2010
						</div>
						<h2 className="mt-2 text-gray-900 text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10">
							Stanford Model United Nations
						</h2>
						<p className="mt-3 text-lg leading-7 text-gray-700">
							Wow this is such a cool conference. Lorem ipsum
							dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna
							aliqua. Ut enim ad minim veniam, quis nostrud
							exercitation ullamco laboris nisi ut aliquip ex ea
							commodo consequat.
						</p>
					</div>
				</div>
			</div>
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
