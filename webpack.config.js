const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    stats: { children: false },
    devtool: 'inline-source-map',
    mode: 'production',
    devServer: {
        contentBase: './dist'
    },
    plugins: [

        new HtmlWebpackPlugin({ // Also generate a test.html
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
          }),
    ],
    module: {
        rules: [{
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: "assets/",
                        publicPath: './assets',
                    }
                }]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src'],
                    }
                }
            },
            {
                test: /\.css$/,
                use: [          
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        outputPath: "assets/",
                        publicPath: './assets',
                        hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    // "style-loader", 
                    "css-loader",
                    "postcss-loader"]
            }
        
        ]

    },
    resolve: {
        alias: {
            css: path.resolve(__dirname, './src/css'),
            img: path.resolve(__dirname, './src/img'),
            js: path.resolve(__dirname, './src/js'),
        }
    }
}