'use strict';

var execSync = require('child_process').execSync;
var through2 = require('through2');
var gulp = require('gulp');
var babel = require('gulp-babel');
var babelConfig = require('atool-build/lib/getBabelCommonConfig')();
var gulpEs3ify = require('antd-tools/lib/gulpEs3ify');
var mergeStream = require('merge-stream');
var transformScss = require('./tools/transformScss');

delete babelConfig.cacheDirectory;

gulp.task('compile', () => {
    execSync('rm -rf lib');
    const scss = gulp.src(['components/**/*.scss'])
    .pipe(through2.obj(function (file, encoding, next) {
        this.push(file.clone());
        // if (file.path.match(/\/style\/index\.scss/)) {
        //     transformScss(file.path).then((css) => {
        //         file.contents = new Buffer(css);
        //         file.path = file.path.replace(/\.scss/, '.css');
        //         this.push(file);
        //         next();
        //     }).catch((e) => {
        //         console.error(e);
        //     });
        // } else {
        //     next();
        // }
        next();
    }))
    .pipe(gulp.dest('lib'));

    const js = gulp.src(['components/**/*.js', 'components/**/*.jsx'])
    .pipe(babel(babelConfig))
    .pipe(gulpEs3ify())
    .pipe(through2.obj(function (file, encoding, next) {
        this.push(file.clone());
        if (file.path.match(/\/style\/index\.js$/)) {
            file.contents = new Buffer(file.contents.toString(encoding)
            .replace(/\/style\/'/, '/style/css.js\'')
            .replace(/\.scss/g, '.css'));
            file.path = file.path.replace(/index\.js$/, 'css.js');
            this.push(file);
            next();
        } else {
            next();
        }
    }))
    .pipe(gulp.dest('lib'));
    return mergeStream(scss, js);
});