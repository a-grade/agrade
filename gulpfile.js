/* Load project configuration file */
const pkg = require("./package.json");
const dirs = pkg.directories;

const gulp = require("gulp");

/* testing */
const mocha = require("gulp-mocha");
const util = require("gulp-util");

/* convert from es6 to es5 */
const	browserify = require("browserify");
const	babelify   = require("babelify");
const	source     = require("vinyl-source-stream");
const	buffer     = require("vinyl-buffer");
const	browser    = require("browser-sync");
const	sass       = require("gulp-sass");
const	clean      = require("gulp-clean");
const	uglify     = require("gulp-uglify");
const	sourcemaps = require("gulp-sourcemaps");

/*
* Delete the contents of the build directory
*/
gulp.task("clean", () => {
	gulp.src( dirs.build, { read: false })
		.pipe( clean() );
});

/*
 * Transpile es6 code to es5 using Babel and browserify
 */
gulp.task("transpile", () => {
	return browserify( dirs.src + "js/script.js", { debug: true })
		.transform("babelify", { presets: [ "es2015" ] })
		.bundle()
		.on("error", util.log.bind( util, "Browserify Error") )
		.pipe( source("main.js") )
		.pipe( buffer() )
		.pipe( sourcemaps.init({ loadMaps: true }) )
		// .pipe( uglify() )
		.pipe( sourcemaps.write(".") )
		.pipe( gulp.dest( dirs.build ) )
		.pipe( browser.stream() );
});

/*
 * Start a server from buid directory
 */
gulp.task("serve", () => {
	browser({
		server: {
			baseDir: dirs.build
		}
	});
});

/*
 * Convert SASS files to CSS
 */
gulp.task("sass", () => {
	return gulp.src( dirs.src + "sass/style.scss")
		.pipe( sass({
			style: "compressed"
		}).on("error", sass.logError ) )
		.pipe( gulp.dest( dirs.build ) )
		.pipe( browser.stream() );
});

/*
 * Watch for when JS, HTML, or SCSS files change so they can be updated
 */
gulp.task("watch", () => {
	gulp.watch( dirs.src + "js/**/*.js", [ "transpile" ]);
	gulp.watch( dirs.src + "**/*.html", []);
	gulp.watch( dirs.src + "sass/**/*.scss", [ "sass" ]);
});

gulp.task("build", [ "clean", "sass", "transpile" ]);
gulp.task("default", [ "build", "serve", "watch" ]);

gulp.task("test", [ "serve" ], () => {
	return gulp.src([ dirs.test + "**/*.js" ], { read: false })
		.pipe( mocha({ reporter: "spec" }) )
		.on("error", util.log );
});

gulp.task("watch-test", [ "serve" ], () => {
	gulp.watch([ dirs.test + "**" ], [ "test" ]);
});
