const getWebpackConfig = require('antd-tools/lib/getWebpackConfig');
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = function (webpackConfig) {
    webpackConfig = getWebpackConfig(webpackConfig);
    if (process.env.RUN_ENV === 'PRODUCTION') {
        // Fix ie8 compatibility
        webpackConfig[0].module.loaders.unshift({
            test: /\.jsx?$/,
            loader: 'es3ify-loader',
        });
    }

    webpackConfig[0].module.loaders.unshift({
        test: /\.jsx?$/,
        loader: 'es3ify-loader',
    });

    webpackConfig[0].module.loaders.unshift({
        test: /\.tpl$/,
        loader: 'html-loader',
    });

    webpackConfig[0].module.loaders.push({
        test: /\.scss/,
        loader: ExtractTextPlugin.extract(
            'css!' +
            'postcss!' +
            `sass-loader?{"sourceMap":true}`
        ),
    });

    webpackConfig[0].plugins.push(new ExtractTextPlugin("[name].css"));

    return webpackConfig;
}