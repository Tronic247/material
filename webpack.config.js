const path = require("path")
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, "src/js/index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "material.min.js",
        library: "Material",
        libraryTarget: "umd",
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: "babel-loader",
        },],
    },
    mode: "production",
    plugins: [
        new webpack.BannerPlugin('Your copyright notice')
    ],
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
}
