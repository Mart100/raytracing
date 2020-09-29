"use strict";

var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var ts = require("gulp-typescript");
var tsify = require("tsify");
var uglify = require("gulp-uglify");
var sass = require('gulp-sass');
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var glob = require('glob');
var es = require('event-stream');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var path = require('path');
var merge = require('merge-stream');
var paths = {
  pages: ["src/public/*.html"],
};

sass.compiler = require('node-sass');

//============================
//=========COPY_HTML==========
//============================
function watch_copy_html() {
	return gulp.watch(paths.pages, copy_html) 
}
function copy_html() {
	return gulp.src(paths.pages).pipe(gulp.dest("./dist/public"))
}


//============================
//=========PUBLIC_TS==========
//============================
function watch_public_ts() {
	return gulp.watch("./src/public/scripts/*", public_ts)
}
function public_ts() {
	var files = glob.sync('./src/public/scripts/*.ts');
	return browserify({
		debug: true,
		entries: files,
	})
	.plugin(tsify)
	.bundle()
	.pipe(source("bundle.js"))
	.pipe(gulp.dest("dist/public"));
}


//============================
//=========SERVER_TS==========
//============================
function watch_server_ts() {
	return gulp.watch("./src/*.ts", server_ts)
}
function server_ts() {
	var tsProject = ts.createProject("./src/tsconfig.json");
	return tsProject.src()
		.pipe(tsProject()).js
		.pipe(gulp.dest("./dist"));
}

//============================
//============SASS============
//============================
function watch_public_sass() {
	return gulp.watch('./src/public/styles/*.scss', public_sass);
}
function public_sass() {
	return gulp.src('./src/public/styles/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/public/styles/'));
}

exports.default = gulp.parallel(watch_copy_html, watch_public_ts, watch_server_ts, watch_public_sass)