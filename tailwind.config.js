// See https://tailwindcss.com/docs/configuration for details
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
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
				// ca = content-area (i.e. screen minus navbar minus footer)
				ca: "calc(100vh - 64px - 120px)",
				"ca-no-footer": "calc(100vh - 64px)",
			},
			minHeight: {
				ca: "calc(100vh - 64px - 120px)",
				"ca-no-footer": "calc(100vh - 64px)",
			},
			cursor: {
				"resize-x": "col-resize",
				"resize-y": "row-resize",
			},
			listStyleType: {
				circle: "circle",
			},
		},
		customForms: (theme) => ({
			default: {
				checkbox: {
					"&.indeterminate": {
						background:
							"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='8' height='2' x='4' y='7' rx='1'/%3E%3C/svg%3E\");",
						borderColor: "transparent",
						backgroundColor: "currentColor",
						backgroundSize: "100% 100%",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					},
				},
			},
		}),
	},
	variants: {},
	// https://github.com/tailwindcss/custom-forms
	plugins: [require("@tailwindcss/ui"), require("@tailwindcss/custom-forms")],
};
