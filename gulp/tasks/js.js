import webpack from "webpack-stream";

export const js = () => {
   return app.gulp
      .src(app.path.src.js, { sourcemaps: app.isDev })
      .pipe(
         app.plugins.plumber(
            app.plugins.notify.onError({
               title: "JS",
               message: "Error: <%= error.message %>",
            })
         )
      )
      .pipe(
         webpack({
            mode: app.isBuild ? "production" : "development",
            module: {
               rules: [
                  {
                     test: /\.(sass|less|css)$/,
                     use: ["style-loader", "css-loader", "sass-loader"],
                  },
                  {
                     test: /\.js$/,
                     exclude: /node_modules/,
                     use: {
                        loader: "babel-loader",
                     },
                  },
               ],
            },
            output: {
               filename: "app.min.js",
            },
         })
      )
      .pipe(app.gulp.dest(app.path.build.js))
      .pipe(app.plugins.browsersync.stream());
};
