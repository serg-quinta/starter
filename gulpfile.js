'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
// const pug = require('gulp-pug');
const nunjucksRender = require('gulp-nunjucks-render');

// Styles
gulp.task('styles', function() {
  return gulp.src('./src/less/main.less')
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(postcss([ autoprefixer({ browsers: ['> 0.5%', 'last 2 version', 'Firefox ESR'] }) ]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('css'));
});

// HTML
// gulp.task('pug', function(){
//   return gulp.src('./src/*.pug')
//     .pipe(pug({pretty: true}))
//     .pipe(gulp.dest('./'))
// });
gulp.task('html', function(){
  return gulp.src('src/templates/**/[^_]*.html')
    .pipe(nunjucksRender({
      path: ['src/templates/'] // String or Array 
    }))
    .pipe(gulp.dest('./'));
});

// Build
gulp.task('build', gulp.parallel('styles', 'html'));

// Watch
gulp.task('watch', function() {
  gulp.watch('./src/less/**/*.less', gulp.series('styles'));
  gulp.watch('./src/**/*.html', gulp.series('html'));
});

// Dev
gulp.task('dev', gulp.series('build', 'watch'));
