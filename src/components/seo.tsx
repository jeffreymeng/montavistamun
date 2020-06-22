/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactElement } from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

function SEO({
	description,
	lang,
	meta,
	keywords,
	title,
}: {
	description?: string;
	lang?: string;
	meta?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
	keywords?: string[];
	title: string;
}): ReactElement {
	lang = lang || "en";
	description = description || "";
	meta = meta || [];
	keywords = keywords || [];

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

	return (
		// not an actual error
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title}
			titleTemplate={`%s | ${site.siteMetadata.title}`}
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
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata.author,
				},
				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
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
