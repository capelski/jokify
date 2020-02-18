const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                query: {
                    configFileName: './tsconfig-client.json'
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    output: {
        filename: '[name].js?$modena=jokify',
        publicPath: '/'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css?$modena=jokify'
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './client/index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: 'assets'
            }
        ])
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.scss']
    },
    // TODO To be applied only on development mode
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        proxy: [
            {
                context: ['/joke'],
                target: 'http://localhost'
            }
        ]
    }
};
