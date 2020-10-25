const gulp = require('gulp');
const minify = require('gulp-minify');
const jsdoc = require('gulp-jsdoc3');
const concat = require('gulp-concat');

function build(cb) {

  const files = [
    'src/stumge_sprite.js',
    'src/stumge_vector2d.js',
    'src/stumge.js',
  ]
  gulp.src(files)
      .pipe(concat('stumge.js'))
      .pipe(minify({
        ext: {
          src: '.js',
          min: '.min.js',
          mangle: true,
          compress: {
            hoist_vars: true
          }
        },
        noSource: true
      }))
      .pipe(gulp.dest('dist'))
  cb();
}

function document(cb) {
  const config = require('./jsdoc.json')
  gulp.src('src/*.js', {read: false})
      .pipe(jsdoc(config, cb))
}

exports.default = gulp.series(document, build);
