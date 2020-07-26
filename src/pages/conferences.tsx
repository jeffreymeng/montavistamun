import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import FluidImage from "../components/FluidImage";
import { Footer, Navbar, Layout } from "../components/layout";
const Conference = ({
	image,
	date,
	name,
	children,
	location,
	buttonText,
}: {
	image: {
		childImageSharp: {
			fluid: FluidObject;
		};
	};
	date: React.ReactNode; // (can be string)
	name: React.ReactNode;
	children: React.ReactNode;
	location: React.ReactNode;
	buttonText?: string;
}) => (
	<div className="max-w-sm w-full lg:max-w-full lg:flex my-10 mx-auto">
		<div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
			<Img
				className={"w-full h-full"}
				fluid={image.childImageSharp.fluid}
			/>
		</div>
		<div className="border-r border-b border-l border-gray-300 lg:border-l-0 lg:border-t lg:border-gray-300 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
			<div className={`mb-${buttonText ? "4" : "8"}`}>
				<p className="text-sm text-gray-600 flex items-center">
					{date} | {location}
				</p>
				<div className="text-gray-900 font-bold text-xl mb-2">
					{name}
				</div>
				<p className="text-gray-700 text-base">{children}</p>
				{buttonText && (
					<div className={"mt-4"}>
						<button
							type="button"
							className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
						>
							<span>{buttonText}</span>
						</button>
					</div>
				)}
			</div>
		</div>
	</div>
);
export default function ConferencesPage({
	data,
}: {
	data: {
		smunc: FluidImage;
		gmunc: FluidImage;
	};
}): React.ReactElement {
	return (
		<Layout title={"About"} empty>
			<Navbar unscrolledClassName={"bg-gray-50"} />
			<div className="relative bg-gray-50 overflow-hidden">
				<div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full">
					<div className="relative h-full max-w-screen-xl mx-auto">
						<svg
							className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
							width="404"
							height="784"
							fill="none"
							viewBox="0 0 404 784"
						>
							<defs>
								<pattern
									id="f210dbf6-a58d-4871-961e-36d5016a0f49"
									x="0"
									y="0"
									width="20"
									height="20"
									patternUnits="userSpaceOnUse"
								>
									<rect
										x="0"
										y="0"
										width="4"
										height="4"
										className="text-gray-200"
										fill="currentColor"
									/>
								</pattern>
							</defs>
							<rect
								width="404"
								height="784"
								fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
							/>
						</svg>
						<svg
							className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
							width="404"
							height="784"
							fill="none"
							viewBox="0 0 404 784"
						>
							<defs>
								<pattern
									id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
									x="0"
									y="0"
									width="20"
									height="20"
									patternUnits="userSpaceOnUse"
								>
									<rect
										x="0"
										y="0"
										width="4"
										height="4"
										className="text-gray-200"
										fill="currentColor"
									/>
								</pattern>
							</defs>
							<rect
								width="404"
								height="784"
								fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
							/>
						</svg>
					</div>
				</div>

				<div className="relative pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
					<main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
						<div className="text-center">
							<h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
								Conferences
							</h2>
							<p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
								Where the fun takes place. Anim aute id magna
								aliqua ad ad non deserunt sunt. Qui irure qui
								lorem cupidatat commodo. Elit sunt amet fugiat
								veniam occaecat fugiat aliqua.
							</p>
						</div>
					</main>
				</div>
			</div>

			<div
				className={
					"flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16"
				}
			>
				{/*
				TODO:
				{
				name:"blah",
				date:"blah",
				location:"blah",
				image:"blah",
				buttonText:"blah",
				}

				*/}
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
					.map((conference, i) => {
						const { text, ...details } = conference;
						return (
							<Conference
								key={i}
								{...details}
								buttonText={
									i === 1
										? "Registration Now Open: Login to Continue"
										: undefined
								}
							>
								{text}
							</Conference>
						);
					})}
			</div>
			<Footer dark />
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
