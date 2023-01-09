Запуск проекта в режиме разработчика: npm run dev
Запуск проекта в режиме продакшн: npm run build
Запуск проекта в режиме продакшн + создание zip архива: npm run zip
Выгрузка проекта на хостинг по FTP: npm run deploy

1. ALIASES:

  Для корректной работы с путями при импортной html, css, js системе,
  необходимо использовать алиасы, которые правильно подберут путь:
    Для изображений: @img/
    Для js: @js/
    Для scss: @scss/

  Также, должен быть установлен VSCode и расширение Path Autocomplete
  В json настройках расширения прописано следующее:
    "path-autocomplete.pathMappings": {
        "@img": "${folder}/src/img",
        "@scss": "${folder}/src/scss",
        "@js": "${folder}/src/js"
    },

2. WEBP CSS:
  Формируется два класса для одного изображения: webp, no-webp
    webp - класс содержит картинку с расширением webp
    no-webp - класс содержит картинку с расширением png, jpg

  Необходимо, если браузер не поддерживает webp изображения

3. Исправление ошибок imagemin:
    node ./node_modules/optipng-bin/lib/install.js
    node ./node_modules/jpeg-recompress-bin/lib/install.js

4. Необходимая структура src:
    - fonts
    - html
    - img
    - js -> app.js
    - scss -> style.scss
    - index.html

5. В папке scss для обновления шрифтов необходимо удалять файл fonts.scss
Также, данный файл необходимо импортировать в корневной файл SCSS

6. Воссоздание svgsprites команда: npm run svgSprite
При этом, в папке src должна быть папка svgicons с svg файлами