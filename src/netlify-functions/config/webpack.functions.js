// solves problem from https://github.com/netlify/netlify-lambda/issues/112

const nodeExternals = require("webpack-node-externals");

module.exports = {
	externals: [nodeExternals()],
};
