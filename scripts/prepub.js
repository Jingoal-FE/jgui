#!/usr/bin/env node

/* eslint-disable */
'use strict';

// Build a entry less file to dist/jgui.scss
var fs = require('fs');
var path = require('path');

if(fs.existsSync(path.join(__dirname,'../dist'))) {
  console.log('Building a entry scss file to dist/jgui.scss');
  var componentsPath = path.join(process.cwd(), 'components');
  var componentsLessContent = '';

// Build components in one file: lib/style/components.scss
  fs.readdir(componentsPath, function (err, files) {
    files.forEach(function (file) {
      if (fs.existsSync(path.join(componentsPath, file, 'style', 'index.scss'))) {
        componentsLessContent += `@import "../${path.join(file, 'style', 'index.scss')}";\n`
      }
    });
    fs.writeFileSync(path.join(process.cwd(), 'lib', 'style', 'components.scss'), componentsLessContent);

    // Build less entry file: dist/jgui.scss
    fs.writeFileSync(
      path.join(process.cwd(), 'dist', 'jgui.scss'),
      '@import "../lib/style/index.scss";\n@import "../lib/style/components.scss";'
    );
  });
}
