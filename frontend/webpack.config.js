const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    // devServer: {
    //     static: {
    //         directory: path.join(__dirname, "dist"),
    //     },
    //     historyApiFallback: true,
    //     // proxy: {
    //     //   '/api': 'http://localhost:5000',
    //     //   '/ws': {
    //     //     target: 'ws://localhost:5001',
    //     //     ws: true
    //     //   }
    //     // },
    //     port: 3000,
    // },
    resolve: {
        extensions: [".js", ".jsx"],
    },
};
