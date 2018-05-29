const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');
const image = require('gulp-image');

const JS_ASSET_DIR = './assets/js/*.js';
const CSS_ASSET_DIR = './assets/scss/*.scss';
const IMG_ASSET_DIR = './assets/img/*';
const HTML_ASSET_DIR = './assets/templates/**.html';

gulp.task('default', defaultTask);

function defaultTask(done) {
  livereload.listen();
  
  gulp.watch(JS_ASSET_DIR, gulp.parallel(['js']));
  gulp.watch(CSS_ASSET_DIR, gulp.parallel(['css']));
  gulp.watch(IMG_ASSET_DIR, gulp.parallel(['img']));
  gulp.watch(HTML_ASSET_DIR, gulp.parallel(['html']));
  done();
}

gulp.task('html', function(done) {
  return gulp.src(HTML_ASSET_DIR)
    .pipe(gulp.dest('public'));
});

gulp.task('img', function(done) {
  return gulp.src(IMG_ASSET_DIR)
    .pipe(image())
    .pipe(gulp.dest('public/img'));
});

gulp.task('css', function(done) {
  return gulp.src(CSS_ASSET_DIR)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(livereload());
});

gulp.task('js', function(done) {
  return gulp.src(JS_ASSET_DIR)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(uglify())
      .pipe(concat('main.js'))
    .pipe(sourcemaps.write('sourcemaps'))
    .pipe(gulp.dest('public/js'))
    .pipe(livereload());
});