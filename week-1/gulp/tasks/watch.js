'use strict';

var browserSync     = require('browser-sync');
var reload          = browserSync.reload;

module.exports = function (gulp, $, config) {

    gulp.task('watch', function() {

        gulp.watch(config.html.watch, ['html', reload]);
        gulp.watch(config.css.watch, ['css']);
        gulp.watch(config.js.watch, ['js', reload]);
        gulp.watch(config.images.watch, ['images', reload]);
        gulp.watch(config.misc.src, ['misc:copy', reload]);

    });

};
