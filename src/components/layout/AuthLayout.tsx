import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React from "react";
import { Layout } from ".";
export default function AuthLayout({
	title,
	children,
	description,
}: {
	title: string;
	description?: string;
	children: React.ReactNode;
}): React.ReactElement {
	const data = useStaticQuery<GatsbyTypes.AuthLayoutQueryQuery>(graphql`
		query AuthLayoutQuery {
			headerImage: file(relativePath: { eq: "headers/auth.jpg" }) {
				childImageSharp {
					fluid(maxWidth: 1600, quality: 80) {
						...GatsbyImageSharpFluid_withWebp
					}
				}
			}
		}
	`);
	return (
		<Layout title={title} navbarShadow="always" description={description}>
			<div className="min-h-ca-no-footer bg-gray-50 flex">
				<div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
					<div className="mx-auto w-full max-w-sm">{children}</div>
				</div>
				<div className="hidden lg:block relative w-0 flex-1">
					<Img
						className="absolute inset-0 h-full w-full object-cover"
						fluid={data?.headerImage?.childImageSharp?.fluid}
						alt="United Nations Headquarters"
					/>
				</div>
			</div>
		</Layout>
	);
}
