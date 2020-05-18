const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/static/",
  },
  mode: "production", // 'production' 'none'
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
      },{
          test: /\.hbs$/,
          use: ["handlebars-loader"]
      }, {
        test: /\.(woff|woff2|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:'[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
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
      filename: "styles.[contenthash].css",
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
        filename: "index.html",
        template:"src/index.hbs",
          description: "some data descirpont",
      }),
  ],
};
