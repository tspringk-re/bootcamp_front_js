const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: path.resolve(__dirname, "src/ts/index.ts"),
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    port: process.env.FRONT_PORT || 8000,
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: {
          loader: "ts-loader",
        },
      },

      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.EnvironmentPlugin({
      API_URL: "http://localhost:3000"
    }),
  ],
};
