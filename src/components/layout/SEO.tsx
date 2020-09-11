/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import { useLocation } from "@reach/router";
import { graphql, useStaticQuery } from "gatsby";
import React, { ReactElement } from "react";
import Helmet from "react-helmet";

function SEO({
	description,
	lang,
	meta,
	keywords,
	title,
	formatTitle,
}: {
	description?: string;
	lang?: string;
	meta?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
	keywords?: string[];
	title: string;
	formatTitle?: boolean; // default: true
}): ReactElement {
	lang = lang || "en";
	description =
		description ||
		"Monta Vista Model United Nations is a close-knit club and community that strives to provide experiences in teamwork, negotiation, and diplomacy by simulating the United Nations during engaging conferences.";
	meta = meta || [];
	keywords = keywords || [
		"Cupertino",
		"Model UN",
		"MUN",
		"Monta Vista",
		"Club",
		"Model United Nations",
	];
	if (formatTitle !== false) {
		title = "MV Model UN | " + title;
	}
	const location = useLocation();
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
					}
				}
			}
		`
	);

	const metaDescription = description || site.siteMetadata.description;
	const imageUrl = `https://montavistamun.com/images/logo-banner.jpg`;
	return (
		// not an actual error
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					property: `og:video`,
					content: `https://www.youtube.com/watch?v=xc1dnpIKIcY`,
				},
				{
					property: `og:image`,
					content: imageUrl,
				},
				{
					property: `og:image:alt`,
					content: `MV Model UN logo on top of some cool images of conferences`,
				},
				{
					property: `og:url`,
					content: `https://montavistamun.com${location.pathname}`,
				},

				{
					name: `twitter:card`,
					content: `summary`,
				},

				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
				{
					name: `twitter:image`,
					content: imageUrl,
				},
			]
				.concat(
					keywords.length > 0
						? {
								name: `keywords`,
								content: keywords.join(`, `),
						  }
						: []
				)
				.concat(meta)}
		/>
	);
}

export default SEO;
