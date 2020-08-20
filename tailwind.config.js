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
			maxWidth: {
				"7xl": "80rem",
				"8xl": "88rem",
			},
			height: {
				// ca = content-area (i.e. screen minus navbar)
				ca: "calc(100vh - 64px)",
			},
			minHeight: {
				// screen minus header minus footer
				ca: "calc(100vh - 64px - 120px)",
			},
		},
	},
	variants: {},
	// https://github.com/tailwindcss/custom-forms
	plugins: [require("@tailwindcss/ui"), require("@tailwindcss/custom-forms")],
};
