const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    port: 8001,
    source: [
        './components',
        './docs'
    ],
    lazyLoad: true,
    theme: './site/theme',
    htmlTemplate: './site/theme/static/template.html',
    plugins: [
        'bisheng-plugin-description',
        'bisheng-plugin-toc?maxDepth=2',
        'bisheng-plugin-react?lang=__react',
        'bisheng-plugin-antd',
    ],
    doraConfig: {
        verbose: true,
        plugins: ['dora-plugin-upload'],
    },
    webpackConfig(config) {
        config.resolve.alias = {
            jgui: process.cwd(),
            site: path.join(process.cwd(), 'site'),
        };

        config.module.loaders.push(
            {
                test(filePath) {
                    return /\.scss/.test(filePath) && !/\.module\.scss/.test(filePath);
                },
                loader: ExtractTextPlugin.extract(
                    'css?sourceMap!' +
                    'postcss!' +
                    `sass-loader?{"sourceMap":true}`
                ),
            }
        );

        config.module.loaders.push(
            {
                test: /\.module\.scss/,
                loader: ExtractTextPlugin.extract(
                    'css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!' +
                    'postcss!' +
                    `sass-loader?{"sourceMap":true}`
                ),
            }
        );

        config.babel.plugins.push([
            require.resolve('babel-plugin-antd'),
            {
                style: true,
                libraryName: 'jgui',
                libDir: 'components',
            },
        ]);

        config.plugins.push(new ExtractTextPlugin("style.css"));
        return config;
    },
};
