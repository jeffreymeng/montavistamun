const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("./tailwind.config.js");

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
	siteMetadata: {
		title: `Monta Vista Model United Nations`,
		description: `Monta Vista Model United Nations Club Website`,
		author: `@jeffreymeng`,
	},
	plugins: [
		`gatsby-plugin-eslint`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `montavistamun`,
				short_name: `mvmun`,
				start_url: `/`,
				background_color: fullConfig.theme.colors.white,
				theme_color: fullConfig.theme.colors.teal["400"],
				display: `minimal-ui`,
				icon: `static/images/logo.jpg`,
			},
		},
		{
			resolve: `gatsby-plugin-postcss`,
			options: {
				postCssPlugins: [
					require("postcss-import"),
					require(`tailwindcss`)(tailwindConfig),
					require(`autoprefixer`),
					...(process.env.NODE_ENV === `production`
						? [require(`cssnano`)]
						: []),
				],
			},
		},
		// `gatsby-plugin-offline`,
	],
};
