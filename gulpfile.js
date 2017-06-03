(function()
{
	/*
	 * Dependencies
	 */
	const gulp = require("gulp");
	const jshint = require("gulp-jshint");
	const sass = require("gulp-sass");
	const concat = require("gulp-concat");
	const uglify = require("gulp-uglify");
	const rename = require("gulp-rename");
	const minifyPipeline = require("pipeline-minify-css");

	/*
	 * Variables
	 */
	let bowerPath = "./bower_components";

	let sourcePath = "./src";
	let sourceJsPath = (sourcePath + "/js");
	let sourceCssPath = (sourcePath + "/scss");

	let distPath = "./dist";
	let distJsPath = (distPath + "/js");
	let distCssPath = (distPath + "/css");

	/*
	 * Gulp Lint
	 */
	gulp.task("lint:app", function()
	{
		return gulp
			.src(sourceJsPath + "/*.js")
			.pipe(jshint())
			.pipe(jshint.reporter("default"));
	});

	/*
	 * Gulp Sass
	 */
	gulp.task("sass:app", function()
	{
		return gulp
			.src(sourceCssPath + "/*.scss")
			.pipe(sass())
			.pipe(gulp.dest(distCssPath));
	});

	/*
	 * Gulp Concat
	 */
	gulp.task("concat:app", function()
	{
		return gulp
			.src(sourceJsPath + "/*.js")
			.pipe(concat("main.js"))
			.pipe(gulp.dest(distJsPath));
	});

	/*
	 * Gulp Concat CSS
	 */
	gulp.task("concat-css:vendor", function()
	{
		return gulp
			.src(bowerPath + "/css-reset/reset.min.css")
			.pipe(minifyPipeline.minifyCSS({
				addSourceMaps: false,
				concat: true,
				concatFilename: "vendor.min.css"
			}))
			.pipe(gulp.dest(distCssPath));
	});

	/*
	 * Gulp Uglify
	 */
	gulp.task("uglify", function()
	{
		return gulp
			.src(distJsPath + "/main.js")
			.pipe(uglify())
			.pipe(rename("main.min.js"))
			.pipe(gulp.dest(distJsPath));
	});

	/*
	 * Gulp Watch
	 */
	gulp.task("watch", function()
	{
		gulp.watch(sourceJsPath + "/*.js", ["lint", "concat", "uglify"]);
		gulp.watch(sourceCssPath + "/*.scss", ["sass"]);
	});

	/*
	 * Default task
	 */
	gulp.task("default", ["lint", "sass", "concat", "uglify"]);
})();