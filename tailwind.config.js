// See https://tailwindcss.com/docs/configuration for details
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	purge: [
		"./src/**/*.js",
		"./src/**/*.jsx",
		"./src/**/*.ts",
		"./src/**/*.tsx",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	variants: {},
	// https://github.com/tailwindcss/custom-forms
	plugins: [require("@tailwindcss/ui"), require("@tailwindcss/custom-forms")],
};
