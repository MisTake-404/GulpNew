import gulp from 'gulp';
// Импорт путей
import path from './gulp/config/path.js';
// Импорт плагинов
import plugins from './gulp/config/plugins.js';
// Импорт задач
import reset from './gulp/tasks/reset.js';
import html from './gulp/tasks/html.js';
import server from './gulp/tasks/server.js';
import scss from './gulp/tasks/scss.js';
import js from './gulp/tasks/js.js';
import images from './gulp/tasks/images.js';
import svgSprite from './gulp/tasks/svgsprite.js';
import zip from './gulp/tasks/zip.js';
import ftp from './gulp/tasks/ftp.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';

// Глобальные переменные
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins
};

// Наблюдение за изменение в файлах
function watcher() {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

export { svgSprite };

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(fonts, gulp.parallel(html, scss, js, images));

// Выполнение задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

// Сборка проекта для режима production
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Экспорт тасков
export { dev };
export { build };
export { deployZIP };
export { deployFTP };

// Запуск сценария
gulp.task('default', dev);