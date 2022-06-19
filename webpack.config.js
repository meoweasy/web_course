const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = 'development'
if (process.env.NODE_ENV === 'production'){
    mode = 'production'
}
console.log(mode + ' mode')
module.exports={
    mode: mode,
    //начальная точка модуля, можно выбрать несколько
    entry: {
        index: './src/pages/index/index.js',
        blog: './src/pages/blog/blog.js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    //указываем как и где выводить наши пакеты
    output: {
        filename: '[name].[contenthash].js',
        assetModuleFilename: "assetst/[hash][ext][query]",
        clean: true,
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: "./src/pages/index/index.pug",
            inject: true,
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            filename: 'blogpage.html',
            template: "./src/pages/blog/blog.pug",
            inject: true,
            chunks: ['blog'],
    })],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (mode === "development") ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {loader: "postcss-loader", options:{
                        postcssOptions:{
                            plugins: [
                                [
                                    "postcss-preset-env",
                                    {
                                        //Option
                                    },
                                ],
                            ],
                        },
                    },
                    },
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
            {
                test: /\.pug$/,
                loader: "pug3-loader",
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options:{
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
}