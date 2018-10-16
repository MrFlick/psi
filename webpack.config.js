var path = require('path');
var webpack = require('webpack');

//var config = require("./config")
//var publicPath = config.publicPath || "/";

var publicPath = "/";

module.exports = {
    entry: './react-src/main.jsx',
    output: {
        path: path.resolve(__dirname, 'react-build'),
        publicPath: publicPath,
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            PUB_STEM: JSON.stringify(publicPath)
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: { presets: ["@babel/env"] }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
}