'use strict';

const gulp            = require('gulp');
const less            = require('gulp-less');
const sourcemaps      = require('gulp-sourcemaps');
const postcss         = require('gulp-postcss');
const autoprefixer    = require('autoprefixer');
const data            = require('gulp-data');
const nunjucksRender  = require('gulp-nunjucks-render');
const prettify        = require('gulp-prettify');
const browserSync     = require('browser-sync').create();
const babel           = require('gulp-babel');
const concat          = require('gulp-concat');

// Styles
gulp.task('styles', function () {
  return gulp.src('src/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([autoprefixer({ browsers: ['> 0.5%', 'last 2 version', 'Firefox ESR'] })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css'));
});

// HTML
gulp.task('html', function () {
  return gulp.src('src/templates/**/[^_]*.html')
    .pipe(nunjucksRender({
      path: ['src/templates/']
    }))
    .pipe(gulp.dest('public'));
});

// 
gulp.task('js', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/js'));
});

// Build
gulp.task('build', gulp.parallel('styles', 'html', 'js'));

// Watch
gulp.task('watch', function () {
  gulp.watch('./src/less/**/*.less', gulp.series('styles'));
  gulp.watch('./src/templates/**/*.html', gulp.series('html'));
  gulp.watch('./src/js/**/*.js', gulp.series('js'));
});

gulp.task('serve', function () {
  browserSync.init({
    server: 'public'
  });

  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

// Dev
gulp.task('dev',
  gulp.series('build', gulp.parallel('watch', 'serve'))
);
