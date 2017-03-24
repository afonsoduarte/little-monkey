'use strict';
// generated on 2014-11-12 using generator-gulp-foundation 0.0.3
var gulp = require('gulp');
var bs = require('browser-sync').create();

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.cssGlobbing({ extensions: ['.scss'] }))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            errLogToConsole: true
          })
          .on('error', $.sass.logError)
        )
        .pipe(
          $.autoprefixer({
            browsers: [
              'last 3 versions',
              'iOS 7',
              'ie 9',
              'android 4',
              'opera 12'
            ]
          })
        )
        .pipe($.sourcemaps.write('./maps'))
        .pipe(gulp.dest('build/styles'))
        .pipe(bs.stream({match: "**/*.css"}))
        //.pipe(bs.reload("*.css"))
        .pipe($.size())
        .pipe($.notify("Compilation complete."));
});

gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe(gulp.dest('build/scripts'))
        .pipe(bs.reload({stream:true}))
        .pipe($.size());
});

gulp.task('html', ['styles', 'scripts'], function () {

    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp
        .src('./app/index.html')
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(gulp.dest('./build/'))
        // .on('error', $.sass.logError)
        // .on('end', $.sass.logError)
        ;

});


gulp.task('images', function () {
    return gulp.src('app/images/*.{png,gif,jpg,jpeg,svg}')
        .pipe(gulp.dest('build/images'))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*')
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('build/fonts'))
        .pipe($.size())
        ;
});

gulp.task('clean', function(cb) {
  del([
    'app/styles/main.css',
    'dist',
  ], cb);
});

var buildTasks = ['html', 'images', 'fonts'];

gulp.task('build', buildTasks);


// Default task build the app
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// User browsersync to serve site
gulp.task('serve', ['styles'], function () {
    bs.init(null, {
        server: {
            baseDir: 'build',
            directory: true
        },
        debugInfo: false,
        open: false,
        browser: "google chrome canary"
    }, function (err, bs) {
        console.log('Started connect web server on ' + bs.options.url);
    });
});

gulp.task('watch', ['serve'], function () {

    // watch for changes
    gulp.watch(['app/index.html'], ['html']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
});
