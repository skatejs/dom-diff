var galv = require('galvatron');
var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var gulpConcat = require('gulp-concat');
var gulpDebug = require('gulp-debug');
var gulpFilter = require('gulp-filter');
var gulpRename = require('gulp-rename');
var gulpUglify = require('gulp-uglify');
var merge = require('merge-stream');

function task () {
  return merge(
    gulp.src('src/index.js')
      .pipe(gulpDebug({ title: 'trace' }))
      .pipe(galv.trace())
      .pipe(gulpBabel())
      .pipe(galv.globalize())
      .pipe(gulpConcat('dom-diff.js'))
      .pipe(gulp.dest('dist'))
      .pipe(gulpUglify())
      .pipe(gulpConcat('dom-diff.min.js'))
      .pipe(gulp.dest('dist'))
      .pipe(gulpDebug({ title: 'dist' })),
    gulp.src('src/index.js')
      .pipe(gulpDebug({ title: 'trace' }))
      .pipe(galv.trace())
      .pipe(gulpFilter('src/**'))
      .pipe(gulpBabel({ modules: 'umd' }))
      .pipe(gulpRename(function (path) {
        path.dirname = path.dirname.replace(/^src/, '.');
      }))
      .pipe(gulp.dest('lib'))
      .pipe(gulpDebug({ title: 'lib' }))
  );
}
task.dependencies = ['./clean'];
module.exports = task;
