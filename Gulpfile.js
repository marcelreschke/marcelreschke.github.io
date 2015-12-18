
/*!
 * gulp
 * $ npm install gulp-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp              = require('gulp'),
    sass              = require('gulp-sass'),
    autoprefixer      = require('gulp-autoprefixer'),
    minifycss         = require('gulp-minify-css'),
    jshint            = require('gulp-jshint'),
    uglify            = require('gulp-uglify'),
    imagemin          = require('gulp-imagemin'),
    rename            = require('gulp-rename'),
    concat            = require('gulp-concat'),
    notify            = require('gulp-notify'),
    cache             = require('gulp-cache'),
    livereload        = require('gulp-livereload'),
    del               = require('del');
    sourcemaps        = require('gulp-sourcemaps');
    addsrc            = require('gulp-add-src');
    connect           = require('gulp-connect');
    order             = require('gulp-order');
    open              = require('gulp-open');
    port              = process.env.port || 8080



// Styles
gulp.task('styles', function() {
  gulp.src('./src/assets/styles/main.scss', { sourcemap: true, style: 'expanded' })
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(connect.reload())
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/assets/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(addsrc('src/assets/vendor/jquery/dist/jquery.min.js'))
    .pipe(addsrc('src/assets/vendor/uikit/js/uikit.min.js'))
    .pipe(order([
      "src/assets/vendor/jquery/dist/jquery.min.js",
      "src/assets/vendor/uikit/js/uikit.min.js",
      "src/assets/scripts/**/*.js"
  ]))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(connect.reload())
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('html', function () {
  gulp.src('dist/**')
    .pipe(connect.reload());
});

// Images
gulp.task('images', function() {
  return gulp.src('src/assets/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(connect.reload())
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['dist/assets/css', 'dist/assests/js', 'dist/assests/img']);
});

gulp.task('connect', function() {
  connect.server({
    port: port,
    root: 'dist',
    livereload: true
  });
});

//launch browser in port
gulp.task('open', function(){
  var options = {
    uri: 'http://localhost:' + port
  }
  gulp.src(__filename)
  .pipe(open(options))
});

// Default task
gulp.task('default', ['clean', 'connect', 'watch'], function() {
  gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/assets/styles/main.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/assets/scripts/**/*.js', ['scripts']);

  // Watch .html files
  gulp.watch(['dist/**/*.html'], ['html']);

  // Watch image files
  gulp.watch('src/assets/images/**/*', ['images']);


});
