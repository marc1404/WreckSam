const webpack = require('webpack');
const path = require('path');

module.exports = env => {
    const isProduction = env && env.production;

    return {
        entry: './src/index.js',
        output: {
            filename: 'app.js',
            path: path.resolve(__dirname, 'assets/js')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src'),
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            ]
        },
        plugins: [
            ...productionPlugins(isProduction)
        ],
        devtool: 'source-map',
        devServer: {
            open: true,
            compress: true,
            historyApiFallback: true,
            port: 3000
        }
    };
};

function productionPlugins(enable) {
    if (!enable) {
        return [];
    }

    return [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            comments: false,
            compress: {
                warnings: false,
                screw_ie8: true
            },
            mangle: {
                screw_ie8: true
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
}