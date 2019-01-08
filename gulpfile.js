'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var image = require('gulp-imagemin');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var postcss = require('gulp-postcss');
var mqPacker = require('css-mqpacker');
var pxtorem = require('postcss-pxtorem');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('watch', function() {
    browserSync.init({
        server: "./dist"
    })
    gulp.watch([
        './src/**/**/*.scss',
        './src/**/**/*.pug'
    ], gulp.parallel('dev:sass', 'dev:pug', 'dev:modules'));
    gulp.watch(['./src/assets/*'], gulp.parallel('images'));
});

gulp.task('dev:sass', function() {
    return gulp
        .src('./src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            mqPacker(),
            pxtorem({replace:false, propList:['*']})
        ]))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('dev:modules', function() {
    return gulp
        .src('src/modules/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            mqPacker(),
            pxtorem({replace:false, propList:['*']})
        ]))
        .pipe(autoprefixer())
        .pipe(concat('modules.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
})

gulp.task('dev:pug', function() {
    return gulp
        .src('src/pages/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp
        .src('src/assets/*')
        .pipe(image())
        .pipe(gulp.dest('dist/assets'))
        .pipe(browserSync.stream());
})

gulp.task('dev', gulp.parallel('images', 'dev:sass', 'dev:pug', 'dev:modules'));


gulp.task('default', gulp.series('dev','watch'));