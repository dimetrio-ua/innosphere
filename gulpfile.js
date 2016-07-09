var gulp = require('gulp');
var postcss = require('gulp-postcss');
var atImport = require('postcss-import');
var mqpacker = require('css-mqpacker');
var autoprefixer = require('autoprefixer');
var color_rgba_fallback = require('postcss-color-rgba-fallback');
var opacity = require('postcss-opacity');
var pseudoelements = require('postcss-pseudoelements');
var vmin = require('postcss-vmin');
var pixrem = require('pixrem');
var precss = require('precss');
var cssnano = require('cssnano');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');

gulp.task('css', function () {
  var processors = [
    atImport,
    mqpacker,
    precss,
    color_rgba_fallback,
    opacity,
    pseudoelements,
    vmin,
    pixrem ({atrules: true}),
    autoprefixer,
    cssnano
  ];
  return gulp.src('src/css/*.css')
    .pipe(postcss(processors))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('dest'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('html', function() {
    return gulp.src('src/html/**/*.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dest'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('watch', function () {
   gulp.watch('src/css/*.css', ['css']);
   gulp.watch('src/html/**/*.html', ['html']);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "dest"
    }
  });
});

gulp.task('start', ['browser-sync', 'watch']);
