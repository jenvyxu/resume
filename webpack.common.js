const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/js/app.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    stats: { children: false },

    plugins: [

        new HtmlWebpackPlugin({ // Also generate a test.html
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
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