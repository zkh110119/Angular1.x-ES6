const {src, dest, series} = require('gulp'),
    browserify = require('browserify'),
    ngHtml2Js = require('browserify-ng-html2js'),
    browserifyCss = require('browserify-css'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    rm = require('rimraf'),
    path = require('path'),
    replace = require('gulp-replace');

function rimraf(cb) {
    rm(path.join(__dirname, 'dist'), function (err) {
        if (err) {
            throw err;
        }
        css();
        browser();
        removeCss(cb);
    });
}

function browser() {
    return browserify({
        entries: './app/app.js',
        debug: false,
        require: ['angular', '@uirouter/angularjs'],
        transform: [browserifyCss, [ngHtml2Js, {
            module: null,
            baseDir: './app/views/',
            stripPathBefore: '/templates',
            prefix: 'ui/',
            requireAngular: false
        }], babelify]
    }).bundle().pipe(source('bundle.js')).pipe(buffer())/*.pipe(uglify()).pipe(rename({extname: '.min.js'}))*/.pipe(dest('./dist/app'));
}

function css() {
    return src('./app/app.less').pipe(less()).pipe(dest('./app/'));
}

function removeCss(cb) {
    rm(path.join(__dirname, 'app/app.css'), function (err) {
        if (err) {
            throw err;
        }
        cb();
    });
}

function moveHtml() {
    return src('./app/index.html').pipe(replace('${JScript}', 'bundle.min.js')).pipe(dest('./dist/app'));
}

module.exports.build = series(rimraf, moveHtml);
