var gulp = require('gulp');
const browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

gulp.task('concat', function() {
  return gulp.src('./source/javascripts/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/javascripts'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('sass', function() {
  return gulp.src(['./source/**/*.sass', './source/**/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('vendorJs', () => {
  return gulp.src([
      './node_modules/jquery/dist/jquery.slim.min.js',
      './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/javascripts'))
});

gulp.task('copy', function() {
  return gulp.src(['./source/**/*.html'])
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: { baseDir: './public' },
    reloadDebounce: 2000
  })
  gulp.watch(['./source/**/*.sass', './source/**/*.scss'], gulp.series('sass'));
  gulp.watch(['./source/javascripts/**/*.js'], gulp.series('concat'));
  gulp.watch(['./source/**/*.html'], gulp.series('copy'));
});


gulp.task('watch', function () {
  gulp.watch(['./source/**/*.sass', './source/**/*.scss'], gulp.series('sass'));
  gulp.watch(['./source/javascripts/**/*.js'], gulp.series('concat'));
  gulp.watch(['./source/**/*.html'], gulp.series('copy'));
});

gulp.task('default', gulp.series('copy', 'concat', 'sass', 'vendorJs', 'browserSync', 'watch'));

