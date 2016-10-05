const gulp = require('gulp');

/* testing */
const mocha = require('gulp-mocha');
const util = require('gulp-util');

/* convert from es6 to es5 */
const
	browserify = require('browserify'),
	babelify   = require('babelify'),
	source     = require('vinyl-source-stream'),
	buffer     = require('vinyl-buffer'),
	browser    = require('browser-sync'),
	sass       = require('gulp-sass'),
	clean      = require('gulp-clean'),
	uglify     = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps');

/*
* Delete the contents of the build directory
*/
gulp.task('clean', () => {
	gulp.src('build', {read: false})
		.pipe(clean());
});

/*
 * Transpile es6 code to es5 using Babel and browserify
 */
gulp.task('transpile', () => {
	return browserify('src/js/script.js', { debug : true })
		.transform('babelify', {presets: ['es2015']})
		.bundle()
		.on('error', util.log.bind(util, 'Browserify Error'))
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		//.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./src/build'))
		.pipe(browser.stream());
});

/*
 * Start a server from buid directory
 */
gulp.task('serve', () => {
	browser({
		server: {
			baseDir: './src'
		}
	});
});

/*
 * Convert SASS files to CSS
 */
gulp.task('sass', () => {
	return gulp.src('src/sass/style.scss')
		.pipe(sass({
			style: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('src/build'))
		.pipe(browser.stream());
});

/*
 * Watch for when JS, HTML, or SCSS files change so they can be updated
 */
gulp.task('watch', () => {
	gulp.watch('src/js/**/*.js', ['transpile']);
	gulp.watch('src/**/*.html', []);
	gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('build', ['clean', 'sass', 'transpile']);
gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('test', ['serve'], () => {
	return gulp.src(['test/**/*.js'], { read: false })
		.pipe(mocha({ reporter: 'spec' }))
		.on('error', util.log);
});

gulp.task('watch-test', ['serve'], () => {
	gulp.watch(['test/**'], ['test']);
});
