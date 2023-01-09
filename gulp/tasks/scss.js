import dartSass from 'sass'; // SASS препроцессор
import gulpSass from 'gulp-sass'; // SASS компилятор
import rename from 'gulp-rename'; // Переименование файла
import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import webpcss from 'gulp-webpcss'; // Выбор Webp изображений
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа запросов


const sass = gulpSass(dartSass);

const scss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'SCSS',
        message: 'Error: <%= error.message %>'
      })
    ))  
    .pipe(app.plugins.replace(/@img\//g, '../img/'))    
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(
      app.plugins.if(app.isBuild,
        groupCssMediaQueries()
      )
    )
    .pipe(
      app.plugins.if(app.isBuild,
        webpcss({
          webpClass: '.webp',
          noWebpClass: '.no-webp'
        })
      )
    )
    .pipe(
      app.plugins.if(app.isBuild,
        autoprefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true
        })
      )
    )
    // Закомментировать, если не нужен сжатый дубль файла стилей
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(
      app.plugins.if(app.isBuild,
        cleanCss()
      )
    )
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
}

export default scss;