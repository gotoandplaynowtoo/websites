
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

/**
 * scss files & build distribution destination
 */
var css = './src/scss/**/*.scss';
var cssDist = './dist/css';

/**
 * js files & build distribution destination
 */
var jsDist = './dist/js';
var js = [
    './src/js/sample-001.js',
    './src/js/sample-002.js',
];

/**
 * Command: gulp css-build
 * Used to build scss files
 */
gulp.task('css-build', function() {

    gulp.src(css)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'extended'
        }).on('error', sass.logError))
        .pipe(concat('bundle.css'))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(cssDist));

    gulp.src(css)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(concat('bundle.min.css'))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(cssDist));

});

/**
 * Command: gulp js-build
 * Used to build js files
 */
gulp.task('js-build', function() {

    gulp.src(js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(jsDist));

    gulp.src(js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDist));

});

/**
 * Command: gulp
 * Gulp default
 */
gulp.task('default', ['css-build', 'js-build'], function() {

    gulp.watch(css, function() {
        gulp.start('css-build');
    });

    gulp.watch(js, function() {
        gulp.start('js-build');
    });

});