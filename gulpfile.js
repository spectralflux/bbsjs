var gulp = require('gulp');

// wee server for dev work, live reloads on changes
var connect = require('gulp-connect');
var connectReload = require('connect-livereload');

// helper library for copying bower dependencies
var mainBowerFiles = require('main-bower-files');

// copy bower dependencies to lib folder
gulp.task('bower', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('dist/js/lib'))
});

gulp.task('build:js', function () {
  return gulp.src('./src/js/**/*')
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});

gulp.task('build', ['build:js']);

gulp.task('copy:css', function () {
    return gulp.src('./src/css/**/*')
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy:assets', function () {
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./dist/assets'));
});

gulp.task('copy:html', function () {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

gulp.task('copy', ['bower', 'copy:assets', 'copy:html', 'copy:css']);

gulp.task('connect', function () {
    return connect.server({
        root: 'dist',
        port: 5000,
        livereload: true,
        middleware: function () {
            return [
                connectReload()
            ];
        }
    });
});

gulp.task('watch', ['copy', 'build'], function () {
    gulp.watch('./src/js/**/*.js', ['build:js']);
    gulp.watch('./src/**/*.html', ['copy:html']);
    gulp.watch('./src/**/*.css', ['copy:css']);
    gulp.watch('./bower_components/**', ['bower']);
});

gulp.task('dev', ['connect', 'watch']);

gulp.task('default', ['build', 'copy']);

