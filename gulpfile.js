const gulp = require('gulp');
const browsersync = require('browser-sync');
const { src, dest, series, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const crLfReplace = require('gulp-cr-lf-replace');
const eslint = require('gulp-eslint');
const htmlReplace = require('gulp-html-replace');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

function browserSync() {
  return browsersync.init(
    {
      server: {
        baseDir: "./dist"
      },
      port: 3000,
    });
}

function htmlTask() {
  return src('src/*.html')
    .pipe(htmlReplace({
      js: {
        defer: '',
        src: 'js/bundle.js',
        tpl: '<script defer="" src="%s"></script>'
      },
      css: 'styles/styles.css'
    }))
    .pipe(dest('dist'))
    .pipe(browsersync.stream());
}

function scriptsTask() {
  return src(['src/js/moment.js', 'src/js/Formatters.js', 'src/js/apiHandler.js', 'src/js/UI.js', 'src/js/renderer.js'])
    .pipe(crLfReplace())
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'))
    .pipe(browsersync.stream());
}

function stylesTask() {
  return src('src/styles/*.css')
    .pipe(autoprefixer())
    .pipe(concat('styles.css'))
    .pipe(dest('dist/styles'))
    .pipe(browsersync.stream());
}

function watchFiles() {
  watch('./src/js/*.js', scriptsTask);
  watch('./src/', scriptsTask);
}

exports.html = htmlTask;
exports.scripts = scriptsTask;
exports.css = stylesTask;
exports.watch = parallel(browserSync, watchFiles);
exports.dev = series(parallel(htmlTask, scriptsTask, stylesTask), parallel(browserSync, watchFiles));
exports.default = parallel(htmlTask, scriptsTask, stylesTask);