const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const del = require("del")
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

var img_src = "./src/assets/**/",
    html_src = "./src/**/*.html",
    css_src = "./src/**/*.css",
    js_src = "./src/**/*.js",
    build = "./build/",
    assets = "./build/assets/";

function cleanBuild(cb) {
    return del([build]);
    cb();
}

gulp.task("clean-build", cleanBuild);


function buildImage(cb) {
    return gulp.src(img_src + "*.+(png|jpg|jpeg|gif|svg)")
        .pipe(imagemin({ interlaced: true }))
        .pipe(gulp.dest(assets));
    cb();
}

gulp.task("build-image", buildImage);

function buildHtml(cb) {
    return gulp.src(html_src)
        .pipe(gulp.dest(build));
    cb();
}

gulp.task("build-html", buildHtml);

function buildCss(cb) {
    return gulp.src(css_src)
        .pipe(gulp.dest(build));
    cb();
}

gulp.task("build-css", buildCss);

function buildJs(cb) {
    return gulp.src(js_src)
        .pipe(gulp.dest(build));
    cb();
}

gulp.task("build-js", buildJs);

gulp.task("build", gulp.series("clean-build", "build-html", "build-css", "build-js", "build-image"));

gulp.task("watch", function (cb) {
    gulp.watch("./src/**/*.*").on(
        "all",
        gulp.series(
            "build",
            cb => {
                browserSync.reload();
                cb();
            }
        )
    );
    cb();
});

gulp.task(
    "serve",
    gulp.parallel("watch", () => {
        browserSync.init({
            port: 4010,
            server: {
                baseDir: "./build/"
            }
        });
    })
);

gulp.task("default", gulp.series("serve"));