import fs, { appendFile } from 'fs'; 
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

// Поиск файлов OTF и конвертация в TTF
export const otfToTtf = () => {
  return app.gulp.src(`${app.path.srcFolder}${app.path.directoryFonts}*.otf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(fonter({
      formats: ['ttf']
    }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}${app.path.directoryFonts}`));
} 

// Поиск файлов TTF и конвертация в WOFF, а потом в WOFF2
export const ttfToWoff = () => {
  return app.gulp.src(`${app.path.srcFolder}${app.path.directoryFonts}*.ttf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(fonter({
      formats: ['woff']
    }))
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.srcFolder}${app.path.directoryFonts}*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontsStyle = () => {
  let fontsFile = `${app.path.srcFolder}${app.path.soursePathSettingsFonts}`;

  fs.readdir(app.path.build.fonts, function(err, fontsFiles) {
    if(fontsFiles) {
      if(!fs.existsSync(fontsFile)) {

        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;

        for(let i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split('.')[0];

          if(newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

            let fontWeightLowerCase = fontWeight.toLowerCase();

            const weights = ['thin', 'extralight', 'light', 'medium', 'regular', 'semibold', 'bold', 'extrabold', 'black'];
            const weightsNumbers = [100, 200, 300, 400, 500, 600, 700, 800, 900];

            let isWeight = false;

            for(let w = 0; w < weights.length; w++) {
              if(weights[w] === fontWeightLowerCase) {
                fontWeight = weightsNumbers[w];
                isWeight = true;
              }
            }

            if(!isWeight) {
              fontWeight = 400;
            }

            fs.appendFile(fontsFile,
              `@font-face {font-family: ${fontName};font-display: swap;src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");font-weight: ${fontWeight};font-style: normal;}\r\n`, 
            cb);

            newFileOnly = fontFileName;
          }
        }
      }
    } else {
      console.log(`Файл ${app.path.soursePathSettingsFonts} уже существует. Для обновления файла его необходимо удалить`);
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
}