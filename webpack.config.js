const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src/js/index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "material.min.js",
        library: "Material",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
    mode: "production",
    plugins: [
        new webpack.BannerPlugin(`
         Tronic247 Material design - v3.0
         https://material.tronic247.com
        
         Copyright (C) 2021 "Tronic247" Posandu Mapa
         licensed under the MIT license.
         https://github.com/Tronic247/material/blob/Main/LICENSE
         `),
    ],
    optimization: {
        minimizer: [
            (compiler) => {
                const TerserPlugin = require("terser-webpack-plugin");
                new TerserPlugin({
                    terserOptions: {
                        compress: {},
                    },
                }).apply(compiler);
            },
        ],
    },
};
