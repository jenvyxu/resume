const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/js/app.js',
    // entry: {
    //     slideUp:'./src/js/model/auto-slide-up.js',
    //     message:'./src/js/model/message.js',
    //     scroll:'./src/js/model/scroll-animate.js',
    //     skills:'./src/js/model/skills.js',
    //     navigation:'./src/js/model/smoothly-navigation.js',
    //     topbar:'./src/js/model/sticky-topbar.js',
    // },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    stats: { children: false },
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        contentBase: './dist'
    },
    plugins: [

        new HtmlWebpackPlugin({ // Also generate a test.html
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin()
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
                use: ["style-loader", "css-loader","postcss-loader"]
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