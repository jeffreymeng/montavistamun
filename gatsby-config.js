const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("./tailwind.config.js");
const path = require(`path`);

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
	siteMetadata: {
		title: `Monta Vista Model United Nations`,
		description: `Monta Vista Model United Nations Club Website`,
		author: `@jeffreymeng`,
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
				ignore: [`**/\.*`], // ignore files starting with a dot
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
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
				icon: `static/images/favicons/android-chrome-512x512.png`,
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
		{
			resolve: `gatsby-plugin-typegen`,
			options: {
				outputPath: `src/__generated__/gatsby-types.d.ts`,
			},
		},
		{
			resolve: `@sentry/gatsby`,
			options: {
				dsn:
					"https://2dd450cde46547e1b78dba0f1c091eb3@o437743.ingest.sentry.io/5400669",
				environment: process.env.NODE_ENV,
				enabled: (() =>
					["production", "stage"].indexOf(process.env.NODE_ENV) !==
					-1)(),
			},
		},
		{
			resolve: "gatsby-plugin-heap",
			options: {
				appId:
					["production", "stage"].indexOf(process.env.NODE_ENV) !== -1
						? "1872368537"
						: "802409435",

				enableOnDevMode: true, // if 'false', heap will be fired on NODE_ENV=production only
			},
		},
		`gatsby-plugin-sass`,
		// `gatsby-plugin-offline`,
	],
};
