var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('scripts', function () {
    return gulp.src(['app/libs/slick/slick.js'])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['sass'], function () {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function () {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function () {
    return del.sync('dist');
});


gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});
//    return gulp.src('app/img/**/*')
//        .pipe(cache(imagemin({
//            interlaced: true,
//            progressive: true,
//            svgoPlugins: [{
//                removeViewBox: false
//            }],
//            use: [pngquant()]
//        })))
//        .pipe(gulp.dest('dist/img'));
//});

gulp.task('build', ['clean', 'sass', 'scripts', 'img'], function () {

    var buildCss = gulp.src(['app/css/style.css', 'app/css/libs.min.css'])
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/font/**/*')
        .pipe(gulp.dest('dist/font'))

    var buildFonts = gulp.src('app/media/**/*')
        .pipe(gulp.dest('dist/media'))

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
    return cache.clearAll();
});

gulp.task('default', ['watch']);
