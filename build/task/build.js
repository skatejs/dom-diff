var galv = require('galvatron');
var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var gulpConcat = require('gulp-concat');
var gulpDebug = require('gulp-debug');
var gulpFilter = require('gulp-filter');
var gulpLess = require('gulp-less');
var gulpRename = require('gulp-rename');

module.exports = function () {
  var filterIcons = gulpFilter('*.?(eot|svg|ttf|woff|woff2)', { restore: true });
  var filterLess = gulpFilter('{**/*,*}.less', { restore: true });
  var filterJs = gulpFilter('{**/*,*}.js', { restore: true });
  return gulp.src('src/lib/index.js')
    .pipe(gulpDebug({ title: 'trace' }))

    // All files are traced from the main js file and inserted into the stream.
    .pipe(galv.trace())

    // Scripts.
    .pipe(filterJs)
    .pipe(galv.cache('babel', gulpBabel()))
    .pipe(galv.cache('globalize', galv.globalize()))
    .pipe(gulpConcat('index.js'))
    .pipe(gulpDebug({ title: 'js' }))
    .pipe(filterJs.restore)

    // Styles.
    .pipe(filterLess)
    .pipe(galv.cache('less', gulpLess()))
    .pipe(gulpConcat('index.css'))
    .pipe(gulpDebug({ title: 'less' }))
    .pipe(filterLess.restore)

    // Flatten all files into `dist`.
    .pipe(gulpRename({ dirname: '.' }))

    // Icons must be in `dist/fonts`.
    .pipe(filterIcons)
    .pipe(gulpRename({ dirname: 'fonts' }))
    .pipe(gulpDebug({ title: 'icons' }))
    .pipe(filterIcons.restore)

    // Write to `dist`.
    .pipe(gulp.dest('dist'));
};
