var path = require('path');
var WrapperPlugin = require('wrapper-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        ReactToe: './src/visualizers/widgets/ReactToe/src/index.jsx',
    },
    output: {
        filename: '[name]Widget.bundle.js',
        path: path.join(__dirname, './src/common/bundles/')
    },
    plugins: [
        new WrapperPlugin({
            test: /\.js$/,
            header: 'define([], function () {\nreturn function (VISUALIZER_INSTANCE_ID, WEBGME_CONTROL, WEBGME_PANEL) {',
            footer: '};\n});'
        }),
        new MiniCssExtractPlugin({
            filename: './styles/[name]Widget.bundle.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};