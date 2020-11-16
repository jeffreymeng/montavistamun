const precss = require("precss");
const postcssImport = require("postcss-import");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const tailwindConfig = require("./tailwind.config.js");
const stripComments = require("postcss-strip-inline-comments");

module.exports = () => ({
	parser: "postcss-scss",

	plugins: [
		postcssImport,
		precss,
		autoprefixer,
		tailwindcss(tailwindConfig),
		...(process.env.NODE_ENV === `production` ? [cssnano] : []),
	],
});
