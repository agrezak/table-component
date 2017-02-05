// Requires

const gulp         = require("gulp");
const babel        = require("gulp-babel");
const rollup       = require("gulp-rollup");
const uglify 	   = require("gulp-uglify");
const sass         = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssnano 	   = require("gulp-cssnano");
const concat       = require("gulp-concat");
const plumber      = require("gulp-plumber");
const fileinclude  = require('gulp-file-include');
const browserSync  = require("browser-sync").create();


// Let's define tasks

gulp.task("sass", () => {
    return gulp.src("src/scss/*.scss")
		.pipe(plumber({
	        errorHandler: function (err) {
	            console.log(err);
	            this.emit('end');
	        }
	    }))
        .pipe(sass())
		.pipe(autoprefixer())
        .pipe(concat('style.css'))
		.pipe(cssnano())
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("js", function() {
  gulp.src("src/js/**/*.js")
	  .pipe(plumber({
		  errorHandler: function (err) {
			  console.log(err);
			  this.emit("end");
		  }
	  }))
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
	.pipe(uglify())
    .pipe(browserSync.reload({
        stream: true
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task("fileinclude", function() {
  gulp.src(["src/html/index.html"])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task("browserSync", () => {
    browserSync.init({
        server: {
            baseDir: "./dist",
			port: 8080
        }
    });
});

gulp.task("default", ["browserSync"], () => {
	gulp.watch("src/**/*.html").on("change", browserSync.reload);
	gulp.watch("src/**/*.html", ["fileinclude"]);
  	gulp.watch("src/scss/**/*.scss", ["sass"]);
  	gulp.watch("src/js/**/*.js", ["js"]);
});

gulp.task("build", ["fileinclude", "sass", "js", "browserSync"]);
