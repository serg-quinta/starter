'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pug = require('gulp-pug');

// Styles
gulp.task('styles', function() {
  return gulp.src('src/less/main.less')
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(postcss([ autoprefixer({ browsers: ['last 2 version', '> 2%', 'iOS >= 8', 'Safari >= 8'] }) ]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('css'));
});

// HTML
gulp.task('pug', function(){
  return gulp.src('src/*.pug', {since: gulp.lastRun('pug')})
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('.'))
});

// Build
gulp.task('build', gulp.parallel('styles', 'pug'));

// Watch
gulp.task('watch', function() {
  gulp.watch('src/less/*.less', gulp.series('styles'));
  gulp.watch('src/**/*.pug', gulp.series('pug'));
});

// Dev
gulp.task('dev', gulp.series('build', 'watch'));
