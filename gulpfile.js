const gulp = require("gulp");
const sass = require("gulp-sass"); 
const concat = require("gulp-concat");
const connect = require("gulp-connect");
const browserSync = require("browser-sync");

gulp.task("connect", () => {
  connect.server({
    port: 8000,
    root: "./public"
  });
});

gulp.task("browserSync", () => {
  browserSync.init({
    proxy: "localhost:8000",
    port: 8000,
    online: true,
    notify: true
  });
});

gulp.task("html", () => {
  return gulp
    .src("./public/**/*.html")
    .pipe(gulp.dest("./public"))
    .pipe(browserSync.stream());
});

gulp.task("sass", () => {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./public/assets/styles"))
    .pipe(browserSync.stream());
});

gulp.task("watch", () => {
  gulp.watch("./public/**/*.html", ["html"]);
  gulp.watch("./src/scss/**/*.scss", ["sass"]);
});

gulp.task("default", ["connect", "browserSync", "watch"]);

gulp.task("build:js", () => {
  return gulp
    .src("./src/javascript/**/*.js")
    .pipe(concat("default.js"))
    .pipe(gulp.dest("./public/assets/scripts"));
});

gulp.task("build", ["build:js"]);
