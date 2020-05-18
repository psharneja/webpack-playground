const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    "hello-world": "./src/hello-world.js",
    kiwi: "./src/kiwi.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  mode: "production", // 'production' 'none'
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      automaticNameDelimiter: '_'
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"],
      },
      // {
      //     test: /\.css$/,
      //     use: ['style-loader', 'css-loader']
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["transform-class-properties"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
      // ,{
      //     test: /\.(xml)$/,
      //     use: [
      //         'xml-loader'
      //     ]
      // }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*",
        path.join(process.cwd(), "build/**/*"),
      ],
    }),
    // new HtmlWebpackPlugin({
    //   title: "hello friends!",
    //   filename: "index.html", // by default template uses index.ejs
    //   meta: {
    //     description: "some data descirpont",
    //   },
    // }),
    new HtmlWebpackPlugin({
      title: "hello friends!",
      chunks: ['hello-world', 'vendors~hello-world~kiwi'],
      filename: "hello-world.html",
      template: "src/page-template.hbs",
      description: "some data descirpont",
    }),
    new HtmlWebpackPlugin({
      title: "hello kiwi!",
      chunks: ['kiwi', 'vendors~hello-world~kiwi'],
      filename: "kiwi.html",
      template: "src/page-template.hbs",
      description: "some data descirpont",
    }),
  ],
};
