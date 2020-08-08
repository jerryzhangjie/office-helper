const gulp = require('gulp')
const watch = require('gulp-watch')     // 不然只能 reload 一次
const electron = require('electron-connect').server.create()

gulp.task('watch:electron', function() {
    electron.start()
    watch(['./main/main.js'], electron.restart)
    watch(['./renderer/*/*.html', './renderer/*/*.js', './renderer/*/*.css'], electron.reload)
})