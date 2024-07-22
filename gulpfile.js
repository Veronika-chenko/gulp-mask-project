import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { isBuild, isDev } from './gulp/config/const.js';
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { plugins } from './gulp/config/plugins.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { generateSvgSprite } from './gulp/tasks/svgSprite.js';
import { zip } from './gulp/tasks/zip.js';

global.app = {
  isBuild: isBuild,
  isDev: isDev,
  path: path,
  gulp: gulp,
  plugins: plugins,
};

function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

export { generateSvgSprite as svgSprite };

const mainTasks = gulp.series(
  gulp.parallel(copy, html, scss, js, images, generateSvgSprite)
);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);

export { dev };
export { build };
export { deployZIP };

gulp.task('default', dev);
