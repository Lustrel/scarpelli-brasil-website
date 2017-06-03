(function()
{
	/*
	 * Dependencies
	 */
	const gulp = require("gulp");
	const jshint = require("gulp-jshint");
	const sass = require("gulp-sass");
	const concat = require("gulp-concat");
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
			.src(sourceCssPath + "/main.scss")
			.pipe(sass({outputStyle: "compressed"}))
			.pipe(rename("main.min.css"))
			.pipe(gulp.dest(distCssPath));
	});

	/*
	 * Gulp Concat
	 */
	gulp.task("concat:app", function()
	{
		return gulp
			.src([
				sourceJsPath + "/home-effect.js",
				sourceJsPath + "/app.js"
			])
			.pipe(concat("main.js"))
			.pipe(gulp.dest(distJsPath));
	});

	gulp.task("concat:vendor", function()
	{
		return gulp
			.src([bowerPath + "/jquery/dist/jquery.js"])
			.pipe(concat("vendor.js"))
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
	 * Gulp Watch
	 */
	gulp.task("watch", function()
	{
		gulp.watch(sourceJsPath + "/*.js", ["lint:app", "concat:app", "uglify:app"]);
		gulp.watch(sourceCssPath + "/**/*.scss", ["sass:app"]);
	});

	/*
	 * Default task
	 */
	gulp.task("vendor", ["concat-css:vendor", "concat:vendor"]);
	gulp.task("app", ["lint:app", "sass:app", "concat:app"]);
	gulp.task("default", ["vendor", "app"]);
})();