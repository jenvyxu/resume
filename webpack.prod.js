const merge=require('webpack-merge')
const common=require('./webpack.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports=merge(common,{
    mode:'production',
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[id].css',
            ignoreOrder: false, 
          }),
    ],

    module: {
        rules: [{
                    test: /\.css$/,
                    use: [
                      {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          // you can specify a publicPath here
                          // by default it use publicPath in webpackOptions.output
                          publicPath: './assets'
                        }
                      },
                      "css-loader",
                      "postcss-loader"
                    ]
                },
                { 
                    test: /\.js$/, 
                    exclude: /node_modules|vendors/, 
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }]

    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
   
})