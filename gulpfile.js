// bower подключения:
// bower install fotorama

//cmd//cd /d и просто перетащить папку

//npm i -g npm-check-updates - плагин npm-check-updates позволяет находить самые последние версии зависимостей, объявленных в package.json, и независимо от каких либо ограничений версий.
// -потом, перед иницииализацией - ncu (просто проверка package.json на обновления), если есть что обновлять тогда ncu -u (это использование плагина npm-check-updates)

//Инициализация проекта: npm i
//Для запуска скрипта из package.json: npm run (Имя скрипта)
//Для сжатия картинок лучше использовать сайт https://tinypng.com/
// . npm init -y - это формирование базового package.json в проекте по умолчанию.
// npm i webpack webpack-cli webpack-dev-server -D - установка webpack (Лаврик продвинутый курс программистов)

// Проблемы
// npm rebuild node-sass решил проблему с node-sass
// npm rebuild - решил проблемму с компиляцией картинок (ничего не помогало)!!!!!!!

const gulp = require("gulp");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const del = require("del");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const gulpif = require("gulp-if");
var gcmq = require("gulp-group-css-media-queries");
var sass = require("gulp-sass");
const smartgrid = require("smart-grid");
//Конец Smartgrid
const cheerio = require("gulp-cheerio");
const imagemin = require("gulp-imagemin");
const replace = require("gulp-replace");
const svgSprite = require("gulp-svg-sprite");
const svgmin = require("gulp-svgmin");
const imageminJpegRecompress = require("imagemin-jpeg-recompress");
const imageminPngquant = require("imagemin-pngquant");
const pug = require("gulp-pug");
const merge = require("merge-stream");
const svgo = require("gulp-svgo");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
// const htmlbeautify = require('gulp-html-beautify');
const size = require("gulp-filesize"); //выводит в консоль размер файлов до и после их сжатия, чем создаёт чувство глубокого морального удовлетворения, особенно при минификации картинок
const webp = require("gulp-webp"); // Пережатие картинок в webp
const webphtml = require("gulp-webp-html"); // добавляет picture в html (пока не пригодился, проще руками по ходу вставлять)
// const webpcss = require("gulp-webpcss"); // добавляет класс webp в css (пока не пригодился, проще руками по ходу вставлять)
const webpack = require("webpack");
const webpackStream = require("webpack-stream");

// Первый вариант
// const isDev = false;
// const isProd = !isDev;
// const isSync = true;

// Второй вариант
const isDev = process.argv.indexOf("--dev") !== -1;
const isProd = !isDev;
const isSync = process.argv.indexOf("--sync") !== -1;

let webConfig = {
  output: {
    filename: "all.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
    ],
  },
  mode: isDev ? "development" : "production",
  devtool: isDev ? "eval-source-map" : "none",
};

// let cssFiles = [
// './node_modules/normalize.css/normalize.css',
//   './src/css/base.css',
//   './src/css/other.css',
//   './src/css/styles.css'
// ];

let jsFiles = [
  "./node_modules/jquery/dist/jquery.min.js",
  "./node_modules/slick-carousel/slick/slick.min.js",
  "./src/libs/ion.rangeSlider.min.js",
  "./src/libs/jquery.formstyler.min.js",
  "./src/libs/jquery.rateyo.min.js",
  //   "./src/libs/modernizr-custom.js",
  //   // "./src/libs/magnific-popup/dist/jquery.magnific-popup.min.js",
  //   // './src/libs/slick-carousel/slick/slick.min.js',
  //   // './node_modules/fullpage.js/dist/fullpage.min.js',
  //   // './node_modules/wow.js/dist/wow.min.js',
  //   // './src/libs/simplebar/packages/simplebar/src/simplebar.min.js',

  "./src/js/script.js",
];

function html() {
  // return gulp
  //   .src("./src/*.html")
  //   .pipe(gulp.dest("./build"))
  //   .pipe(gulpif(isSync, browserSync.stream()));
}

function htmlPug() {
  return (
    gulp
      .src("./src/pug/*.pug")
      .pipe(
        pug({
          pretty: true,
        })
      )
      .pipe(webphtml())
      // .pipe(gulpif(condition(process), webphtml()))
      .pipe(gulp.dest("./build"))
      .pipe(gulpif(isSync, browserSync.stream()))
  );
}

function clear() {
  return del("build/*");
}

function styles() {
  return (
    gulp
      // .src(cssFiles) так файлы из массива будут добавляться не в алфавитном порядке, а так как мы назначили
      // .pipe(concat('styles.css'))
      .src("./src/scss/style.scss")
      .pipe(gulpif(isDev, sourcemaps.init()))
      .pipe(sass())

      // .on('error', console.error.bind(console))

      .pipe(
        autoprefixer({
          overrideBrowserslist: [">0.1%"],
          cascade: false,
        })
      )
      //Из-за gcmq() плохо работает sourseMap, наверное луче использовать в конце верстки
      // .pipe(gcmq())
      .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
      .pipe(gulpif(isDev, sourcemaps.write()))

      .pipe(gulp.dest("./build/css"))
      .pipe(gulpif(isSync, browserSync.stream()))
  );
}

// function scripts() {
//   return (
//     gulp
//       .src(jsFiles)
//       .pipe(gulpif(isDev, sourcemaps.init()))
//       .pipe(concat("all.js"))
//       // .pipe(uglify({
//       //   toplevel: true
//       // }))
//       .pipe(gulpif(isDev, sourcemaps.write()))
//       .pipe(gulp.dest("./build/js"))
//       .pipe(gulpif(isSync, browserSync.stream()))
//   );
// }
function scripts() {
  return gulp
    .src("./src/js/script.js")
    .pipe(webpackStream(webConfig))
    .pipe(gulp.dest("./build/js"))
    .pipe(gulpif(isSync, browserSync.stream()));
}

// function scriptModernizr() {
//   return (
//     gulp
//     .src("src/libs/modernizr-custom.js")
//     .pipe(gulp.dest("./build/js"))
//     .pipe(gulpif(isSync, browserSync.stream()))
//   );
// }

// function allimg() {
//   return gulp.src('./src/img/**/*.{png, jpg}')
//     .pipe(gulp.dest('./build/img'))
//     .pipe(gulpif(isSync, browserSync.stream()))
// }

//start//////////////////////Мой images//////////////////////////

function images() {
  return gulp
    .src("./src/images/**/*.+(png|jpg|jpeg|gif|ico|webp)")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 80, progressive: true }), // перестал выдавать ошибку и с ним сжимает больше
        imagemin.optipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(gulp.dest("./build/images"))
    .pipe(gulpif(isSync, browserSync.stream()))
    .pipe(size());
}

function webpImg() {
  return gulp
    .src("./src/images/**/*.+(png|jpg|jpeg|gif|ico|webp)")
    .pipe(size())
    .pipe(
      webp({
        quality: 75,
        method: 6,
      })
    )
    .pipe(gulp.dest("./build/images"))
    .pipe(gulpif(isSync, browserSync.stream()))
    .pipe(size());
}

//end////////////////////Мой images//////////////////////////
// по процентам вышло одинаково
//start//////////////////////Сердюк images//////////////////////////

// function images() {
//   //пережимаем изображения и складываем их в директорию build
//   return gulp
//     .src("src/img/**/*.+(png|jpg|jpeg|gif|ico|webp)")
//     .pipe(size())
//     .pipe(
//       imagemin(
//         [
//           imageminJpegRecompress({
//             //Настройки сжатия изображений. Сейчас всё настроено так, что сжатие почти незаметно для глаза на обычных экранах. Можете покрутить настройки, но за результат не отвечаю.
//             loops: 4, //количество прогонок изображения
//             min: 80, //минимальное качество в процентах
//             max: 100, //максимальное качество в процентах
//             quality: "high", //тут всё говорит само за себя, если хоть капельку понимаешь английский
//             use: [imageminPngquant({ interlaced: true })],
//           }),
//           imagemin.gifsicle(), //тут и ниже всякие плагины для обработки разных типов изображений
//           imagemin.optipng(),
//         ],
//       ),
//     )
//     .pipe(gulp.dest("build/img"))
//     .pipe(gulpif(isSync, browserSync.stream()))
//     .pipe(size());
// }

//end////////////////////Сердюк images//////////////////////////

function svg() {
  return (
    gulp
      .src("./src/images/sprite/**/*.svg")
      .pipe(
        svgmin({
          js2svg: {
            pretty: true,
          },
        })
      )
      .pipe(
        cheerio({
          run: function ($) {
            $("[fill]").removeAttr("fill");
            $("[stroke]").removeAttr("stroke");
            $("[style]").removeAttr("style");
          },
          parserOptions: { xmlMode: true },
        })
      )
      .pipe(replace("&gt;", ">"))
      // build svg sprite
      .pipe(
        svgSprite({
          mode: {
            symbol: {
              sprite: "sprite.svg",
            },
          },
        })
      )
      .pipe(gulp.dest("./build/images/"))
  );
}

function totalSvg() {
  return gulp
    .src("./src/images/totalSvg/**/*.svg")
    .pipe(
      // svgo({
      //   plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
      // })
      imagemin([
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest("./build/images"))
    .pipe(gulpif(isSync, browserSync.stream()));
}

///////////////Начало -БЛОК СО ШРИФТАМИ//////////////////////

function clearFonts() {
  return del("./build/fonts");
}

function fonts() {
  return gulp
    .src("./src/fonts/copyFonts/**/*.+(woff|woff2)")
    .pipe(gulp.dest("./build/fonts"))
    .pipe(gulpif(isSync, browserSync.stream()));
}

function fontWoff() {
  return gulp
    .src("src/fonts/copyFonts/**/*.+(eot|svg|ttf|otf|woff|woff2)")
    .pipe(ttf2woff())
    .pipe(gulp.dest("./build/fonts"))
    .pipe(gulpif(isSync, browserSync.stream()));
}

function fontWoff2() {
  return gulp
    .src("src/fonts/copyFonts/**/*.+(eot|svg|ttf|otf|woff|woff2)")
    .pipe(ttf2woff2())
    .pipe(gulp.dest("./build/fonts"))
    .pipe(gulpif(isSync, browserSync.stream()));
}
///////////////Окончание -БЛОК СО ШРИФТАМИ//////////////////////

// function clearCopyResources() {
//   return del([
//     './build/fonts',
//     './build/img/**/*.svg',
//     './build/*.php'
//   ]);
// }

// function copyResources() {
//   return merge([
//       gulp.src('./src/img/**/*.svg').pipe(gulp.dest('./build/img')),
//       gulp.src('./src/img/**/*.gif').pipe(gulp.dest('./build/img')),
//       gulp.src('./src/*.php').pipe(gulp.dest('./build/'))
//   ])
//   .pipe(gulpif(isSync, browserSync.stream()));
// };

//Функция копирования от html Academy, base нужен для сохранения структуры папок в build
// function copy() {
//   return gulp
//   .src([
//       "src/img/**/*.svg",
//       "src/img/**/*.gif",
//       "src/*.php"
//     ], {
//       base: "src"
//     })
//     .pipe(gulp.dest("build/test"));
// };

function watch() {
  if (isSync) {
    browserSync.init({
      server: {
        baseDir: "build",
      },
      browser: [""],
    });
  }
  gulp.watch("./src/scss/**/*.scss", styles);
  gulp.watch("./src/libs/**/*", gulp.parallel(styles, scripts));
  gulp.watch("./src/**/*.html", html);
  gulp.watch("./src/pug/**/*.pug", htmlPug);
  gulp.watch("./src/js/**/*.js", scripts);
  // gulp.watch("./src/img/**/*.{png,jpg}", images);
  gulp.watch(
    "./src/images/**/*.+(png|jpg|jpeg|gif|ico|webp)",
    gulp.parallel(images, webpImg)
  );
  gulp.watch("./src/images/sprite/*.svg", svg);
  gulp.watch("./src/images/totalSvg/**/*.svg", totalSvg);
  gulp.watch(
    "./src/fonts/**/*",
    gulp.series(clearFonts, fontWoff, fontWoff2, fonts)
  );
  // gulp.watch('./src/img/**/*.{png,jpg}', allimg);
  // gulp.watch('./src/img/**/*.svg', gulp.series(clearCopyResources, copyResources, svg));
  // gulp.watch('./src/*.php', gulp.series(clearCopyResources, copyResources));
  // gulp.watch('./src/fonts/**/*', gulp.series(clearCopyResources, copyResources));
  gulp.watch("./smartgrid.js", grid);
}

function grid(done) {
  delete require.cache[require.resolve("./smartgrid.js")];
  let settings = require("./smartgrid.js");
  smartgrid("./src/scss", settings);

  // settings.offset = '3.1%';
  // settings.filename = 'smart-grid-per';
  // smartgrid('./src/css', settings);
  done();
}

let build = gulp.series(
  clear,
  gulp.parallel(
    htmlPug,
    styles,
    scripts,
    images,
    webpImg,
    svg,
    totalSvg,
    fonts,
    fontWoff,
    fontWoff2
  )
  //для html// gulp.parallel(html, styles, scripts, images, svg, totalSvg, fonts),
);

gulp.task("build", gulp.series(grid, build));
gulp.task("watch", gulp.series(build, watch));

gulp.task("grid", grid);
