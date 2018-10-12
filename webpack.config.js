const path = require('path');
const packageFile = require('./package.json');
const WriteFilePlugin = require('write-file-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: path.join(__dirname, 'src', 'js', 'index.js'),
    },
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'app', packageFile.version),
        publicPath: `app/${packageFile.version}`
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true
                    }
                }
            }
        ]
    },
    plugins: [
        new WriteFilePlugin(),
        new HtmlWebpackPlugin({
            title: 'app',
            filename: path.join(__dirname, 'app', 'index.html'),
            template: path.join(__dirname, 'src', 'html', 'index.html'),
        })
    ],
    devServer: {
        host: 'localhost',
        port: 2006,
        historyApiFallback: {
            index: '/app/index.html'
        },
        stats: {
            assets: false,
            children: false,
            chunks: false,
            modules: false,
        }
    }
}