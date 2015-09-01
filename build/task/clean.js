var gulp = require('gulp');
var gulpClean = require('gulp-clean');

module.exports = function () {
  return gulp.src('dist').pipe(gulpClean());
};
