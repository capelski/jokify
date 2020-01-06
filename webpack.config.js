const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/scripts/index.ts',
        search: './src/scripts/search.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                query: {
                    configFileName: './tsconfig.json'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader'
                ],
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
        filename: '[name].js?$modena=bachata-science',
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            inject: false,
            template: './src/index.html',
        }),
        
        new HtmlWebpackPlugin({
            filename: './search.html',
            inject: false,
            template: './src/search.html',
        }),
        new CopyWebpackPlugin([{
            from: 'assets'
        }])
    ],
    resolve: {
        extensions: ['.js', '.ts', '.scss'],
    },
    // TODO To be applied only on development mode
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        proxy: [{
            context: ['/random'],
            target: 'http://localhost',
        },{
            context: ['/filter'],
            target: 'http://localhost',
        }],
    }
};