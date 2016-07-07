var sass = require('node-sass');
var fs = require('fs');
var path = require('path');
var postcss = require('postcss');
var rucksack = require('rucksack-css');
var autoprefixer = require('autoprefixer');

function transformScss(scssFile) {
    var resolvedScssFile = path.resolve(process.cwd(), scssFile);
    // var data = fs.readFileSync(resolvedScssFile, 'utf-8');
    // data = data.replace(/^\uFEFF/, '');

    return new Promise((resolve, reject) => {
        sass.render({
            file: resolvedScssFile,
            //data: data,
            sourceMap: false
        }, function (error, result) {
            const plugins = [
                rucksack(),
                autoprefixer({
                    browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8'],
                }),
            ];

            if (error)  {
                console.log(error);
            }
            const source = result.css;
            const postcssOpts = {};

            postcss(plugins).process(source, postcssOpts)
            .then(r => {
                resolve(r.css);
            })
            .catch(err => {
                reject(err);
            });
        });
    });
}

module.exports = transformScss;