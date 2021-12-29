const path = require("path")

module.exports = {
    entry: path.resolve(__dirname, "index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: "Material",
        libraryTarget: "umd",
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: "babel-loader",
        }, ],
    },
    mode: "production",
}
