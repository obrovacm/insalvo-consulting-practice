// Init modules
const { src, dest, watch, series, parallel } = require("gulp");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const postcss = require("gulp-postcss");
const replace = require("gulp-replace");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
 
const destFolder = "dist";
// File paths
const files = {
  scssPath: "src/scss/**/*.scss",
  jsPath: "src/js/**/*.js",
};

// Sass task
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano]))
    .pipe(sourcemaps.write("."))
    .pipe(dest(destFolder + "/css"));
}

// JS task
function jsTask() {
  return src(files.jsPath)
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(dest(destFolder + "/js"));
}

// Cachebusting task
function cacheBustTask() {
  const cbString = new Date().getTime();
  return src(["index.html"])
    .pipe(replace(/cb=\d+/g, "cb=" + cbString))
    .pipe(dest("."));
}

// Watch task
function watchTask() {
  watch([files.scssPath, files.jsPath], parallel(scssTask, jsTask));
}

// Default task
exports.default = series(parallel(scssTask, jsTask), cacheBustTask, watchTask);
