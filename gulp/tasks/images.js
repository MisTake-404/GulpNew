import webp from 'gulp-webp';
import imagemin, {gifsicle, optipng, svgo} from 'gulp-imagemin';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';

const images = () => {
  return app.gulp.src(app.path.src.images)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'IMAGES',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(
      app.plugins.if(app.isBuild,
        webp()
      )
    )
    .pipe(
      app.plugins.if(app.isBuild,
        app.gulp.dest(app.path.build.images)
      )
    )
    .pipe(
      app.plugins.if(app.isBuild,
        app.gulp.src(app.path.src.images)
      )
    )
    .pipe(
      app.plugins.if(app.isBuild,
        app.plugins.newer(app.path.build.images)
      )
    )
    .pipe(
      app.plugins.if(app.isBuild,
        imagemin([
          gifsicle({interlaced: true}),
          imageminJpegRecompress({quality: 75, progressive: true}),
          optipng({optimizationLevel: 5}),
          svgo({
            plugins: [
              {
                name: 'removeViewBox',
                active: true
              },
              {
                name: 'cleanupIDs',
                active: false
              }
            ]
          })
        ])
      )
    )
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream());
};

export default images;