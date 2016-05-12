let gulp = require('gulp');
let uglify = require('gulp-uglify');
let liveReload = require('gulp-livereload');
let concat = require('gulp-concat');
let minifyCss = require('gulp-minify-css');
let autoprefixer = require('gulp-autoprefixer');
let plumber = require('gulp-plumber');
let sourcemaps = require('gulp-sourcemaps');
let sass= require('gulp-sass');
let imagemin = require('gulp-imagemin');

// File paths
let DIST_PATH = 'public/dist';
let SCRIPTS_PATH = 'public/scripts/**/*.js';
let CSS_PATH = 'public/css/**/*.css';
let IMG_PATH = 'public/images/**/*';
let HTML_PATH = 'public/index.html';

// Styles
gulp.task('styles', function() {
	console.log('starting styles task');
	return gulp.src('public/scss/styles.scss')
		.pipe(plumber(function(err) {
			console.log('Styles Task Error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(autoprefixer())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest(DIST_PATH))
		.pipe(liveReload());
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src(SCRIPTS_PATH)
		.pipe(uglify())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(liveReload());
});

// Images
gulp.task('images', function() {
	return gulp.src(IMG_PATH)
		.pipe(imagemin())
		.pipe(gulp.dest(DIST_PATH + '/images'));
});

// HTML
gulp.task('html', function() {
	return gulp.src(HTML_PATH)
		.pipe(liveReload());
});

// Default
gulp.task('default', ['images', 'styles', 'scripts'], function() {
	console.log('starting default task');
});

// Watch
gulp.task('watch', ['default'], function() {
	require('./server.js');
	liveReload.listen();
	gulp.watch(SCRIPTS_PATH, ['scripts']);
	gulp.watch('public/scss/**/*.scss', ['styles']);
	gulp.watch(HTML_PATH, ['html']);
});