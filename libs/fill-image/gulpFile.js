var gulp = require('gulp');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var pkg = require('./package.json');
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @author <%= pkg.author %>',
    ' * @license <%= pkg.license %>',
    ' */\n',
    ''
].join('\n');

var config = {
    src: ['src/fill-image.js'],
    dist: 'dist'
};

gulp.task('pack', function() {
    return gulp.src(config.src)
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest(config.dist))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest(config.dist));
});

gulp.task('lint', function() {
    return gulp.src(config.src)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('watch', function() {
    gulp.watch(config.src, ['lint']);
});

gulp.task('build', [
    'lint',
    'pack'
]);

gulp.task('default', ['watch']);
