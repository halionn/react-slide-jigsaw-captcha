var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'app/index.jsx'),
        vendor: [
            'react',
            'react-dom',
            'es6-promise',
            'whatwg-fetch'
        ]
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].[chunkhash:8].js",
        //publicPath: '/'
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.(scss|css)?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|bmp|png|webp)?$/i,
                exclude: /(node_modules|bower_components)/,
                loader: 'file-loader'
            },
            {
                test: /\.(woff|woff2|svg|ttf|eot)?$/i,
                exclude: /(node_modules|bower_components)/,
                loader: 'file-loader'
            }
        ]
    },

    plugins: [
        new webpack.BannerPlugin("Copyright by 99bill.com"),

        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        }),

        new ExtractTextPlugin('[name].[chunkhash:8].css'),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].[chunkhash:8].js'
        }),

        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        }),

        new CopyWebpackPlugin([
            {
                from: 'www/static/scripts/flexible.js',
                to: 'static/scripts'
            }
        ])

    ]


}