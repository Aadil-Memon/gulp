/* Variables Defination */
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var watch = require('gulp-watch');
var rimraf = require('gulp-rimraf');

/* Tasks */

gulp.task('concat-css', function() {
    return gulp.src(['../assets/css/datatables.min.css', '../assets/css/line-awesome.min.css', '../assets/css/jquery.mCustomScrollbar.css', '../assets/css/bootstrap-select.min.css', '../assets/css/bootstrap.css', '../assets/css/bootstrap-slider.css'])
        .pipe(concat('styles.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest('../assets/build/css'));
});

gulp.task('sass', function() {
    return gulp.src('../assets/sass/*.scss')
        .pipe(sass())
        .pipe(uglifycss())
        .pipe(gulp.dest('../assets/build/css'));
});

gulp.task('concat-js', function() {
    return gulp.src(['../assets/scripts/jquery.min.js', '../assets/scripts/popper.min.js', '../assets/scripts/bootstrap-slider.min.js', '../assets/scripts/bootstrap.min.js', '../assets/scripts/bootstrap.bundle.min.js', '../assets/scripts/bootstrap-select.min.js', '../assets/scripts/bootstrap-tooltip-custom-class.js', '../assets/scripts/jquery.mCustomScrollbar.js', '../assets/scripts/Chart.min.js', '../assets/scripts/dashboard.js', '../assets/scripts/datatables.min.js', '../assets/scripts/ripple.min.js', '../assets/scripts/custome.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../assets/build/js'));
});

gulp.task('image-min', function() {
    return gulp.src('../assets/image/*')
        .pipe(imagemin())
        .pipe(gulp.dest('../assets/build/optimizedimg'));
});

gulp.task('html-min', function() {
    return gulp.src('../statictemplate/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('../minifytemplate'));
});

gulp.task('watch', function() {
    gulp.watch('../assets/css/*.css', gulp.series('concat-css'));
    gulp.watch('../assets/sass/*.scss', gulp.series('sass'));
    gulp.watch('../assets/scripts/*.js', gulp.series('concat-js'));
    gulp.watch('../assets/image/*', gulp.series('image-min'));
    gulp.watch('../statictemplate/*', gulp.series('html-min'));
});

gulp.task('clean', function() {
    return gulp.src("../assets/build/*")
        .pipe(rimraf());
});

gulp.task('default', gulp.series('concat-css', 'sass', 'concat-js', 'image-min', 'html-min', 'watch', 'clean'));