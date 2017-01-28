// Requires

const gulp        = require("gulp");
const babel       = require("gulp-babel");
const rollup      = require("gulp-rollup");
const sass        = require("gulp-sass");
const concat      = require("gulp-concat");
const browserSync = require("browser-sync").create();


// Let's define tasks

gulp.task("sass", () => {
    return gulp.src("src/scss/*.scss")
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function() {
  gulp.src('src/js/**/*.js')
    .pipe(rollup({
      "format": "iife",
      "plugins": [
        require("rollup-plugin-babel")({
          "presets": [["es2015", { "modules": false }]],
          "plugins": ["external-helpers"]
        })
      ],
      entry: 'src/js/app.js'
    }))
    .pipe(browserSync.reload({
        stream: true
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task("browserSync", () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });


});

// Tasks here

gulp.task("default", ["browserSync"], () => {
	gulp.watch("src/**/*.html").on("change", browserSync.reload);
  gulp.watch("src/scss/**/*.scss", ["sass"]);
  gulp.watch("src/js/**/*.js", ["js"]);
});

gulp.task("build", ["browserSync", "sass", "js"]);
