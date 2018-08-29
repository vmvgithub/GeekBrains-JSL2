const gulp = require('gulp'),
        useref = require('gulp-useref'),
        gulpif = require('gulp-if'),
        uglify = require('gulp-uglify-es').default,
        minifyCss = require('gulp-clean-css');

gulp.task('default', function () {
    return gulp.src('src/*.html')
            .pipe(useref())
            .pipe(gulpif('*.js', uglify()))
            .pipe(gulpif('*.css', minifyCss()))
            .pipe(gulp.dest('build'));
});
