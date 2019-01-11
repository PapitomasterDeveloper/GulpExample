const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
 * Top level functions
 * gulp.task - Define tasks
 * gulp.src - Point to file to use
 * gulp.dest - Points to folder to output the result
 * gulp.watch - Watch files and folders for changes
*/

// Logs message
// Body of the task in a semantic way
// Task to define, name of the task, function saying what to do
// Since Gulp 4.x now doesn't assume that your code is synchrnous, you have to explicity signal task completion with mechanism like Stream or a Promise, in Gulp 3.x this is not the case
gulp.task('message', function(){
  return new Promise(function(resolve, reject) {
    console.log('Gulp is running...');
    resolve();
  });
});

//Define your task, make the function to your procedure, make the Async mechanism
//The source to process
//Pipe the destination
gulp.task('copyHtml', function(){
  return new Promise(function(resolve, reject){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
        resolve();
  });
});

gulp.task('imageMin', function(){
  return new Promise(function(resolve, reject){
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        resolve();
  });
});

gulp.task('minify', function(){
  return new Promise(function(resolve, reject){
    gulp.src('src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
        resolve();
  });
});

gulp.task('sass', function(){
  return new Promise(function(resolve, reject){
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
        resolve();
  });
});

gulp.task('concat', function(){
  return new Promise(function(resolve, reject){
    gulp.src('src/scripts/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
        resolve();
  });
});

/*
gulp.task('default', function(){
  return new Promise(function(resolve, reject){
    console.log('Gulp is running..........');
    resolve();
  });
});
*/

let build = gulp.series(gulp.parallel('message', 'copyHtml', 'imageMin', 'minify', 'sass', 'concat'));

gulp.task('default', build);
  
// gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'concat']);
