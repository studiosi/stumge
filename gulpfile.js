const gulp = require('gulp');
const minify = require('gulp-minify');
const jsdoc = require('gulp-jsdoc3');

function build(cb) {
  gulp.src('src/*.js')
    .pipe(minify({
      ext: {
        src: '.js',
        min: '.min.js',
        mangle: true,
        compress: {
          hoist_vars: true
        }
      }
    }))
    .pipe(gulp.dest('dist'));
  cb();
}

function document(cb) {
  const config = require('./jsdoc.json')
  gulp.src('src/*.js', {read: false})
      .pipe(jsdoc(config, cb))
}

exports.default = gulp.series(document, build);
