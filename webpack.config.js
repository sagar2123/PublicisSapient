const path = require("path");
const webpack = require("webpack");


module.exports = {
	entry: "./server/server.js",
    target: "node",
	output: {
		path: path.resolve(__dirname, "dist"),
    },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        '@babel/react',
                        ['@babel/env', {targets: { browsers: ["last 2 versions"]}}]
                    ]
                }
			},
			{
				test: /\.(css)$/,
				use: ["style-loader", "css-loader"]
			}
		]
	}
};
