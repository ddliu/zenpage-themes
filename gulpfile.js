var gulp = require('gulp');
var less = require('gulp-less');
var exec = require('child_process').exec;
var helper = require('./helper');

var themes = helper.getThemes({
    cwd: './'
});

gulp.task('default', ['less', 'screenshot']);

gulp.task('less', function() {
    gulp.src('./*/*.less')
        .pipe(less())
        .pipe(gulp.dest('./'))
});

gulp.task('genpage', function(cb) {
    var cmd = themes.map(function(v) {
        return 'zenpage  --theme=' + v + ' example.md _build/' + v + '/example.html';
    }).join(' && ');

    exec(cmd, function(error, stdout, stderr) {
        cb(error);
    });
});

gulp.task('screenshot', ['genpage'], function() {
    var cmd = themes.map(function(v) {
        return 'phantomjs rasterize.js _build/' + v + '/example.html ' + v + '/snapshot.png 768px 0.8';
    }).join(' && ');

    exec(cmd);
});