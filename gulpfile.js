'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var pug = require('gulp-pug');

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');


gulp.task('pug', function () {
    return gulp.src(['./views/*.pug', '!./views/_*.pug'])
        .pipe(pug())
        .pipe(gulp.dest('.'))
});

gulp.task('pug:watch', ['pug'], reload);


gulp.task('sass', function () {
    return gulp.src('./styles/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({browsers: ['last 2 versions']}),
            cssnano()
        ]))
        .pipe(rename('./bundle.css'))
        .pipe(gulp.dest('.'))
        .pipe(reload({ stream: true }))
});


gulp.task('default', ['sass', 'pug'], function () {
    browserSync({
        server: {
            baseDir: '.'
        }
    });

    gulp.watch('./styles/**/*.scss', ['sass']);
    gulp.watch('./views/**/*.pug', ['pug:watch']);
});
