const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const production = process.env.NODE_ENV == "production";

let plugins = [
  new HtmlWebpackPlugin({
    title: "React with Redux Boilerplate",
    template: "./public/index.html"
  }),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
  })
];

if (!production) {
  plugins.push(new webpack.NamedModulesPlugin());
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  entry: {
    main: ["babel-polyfill", "./public/assets/style.css", "./src/client/index.js"]
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.json?$/,
        use: {
          loader: "json-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]"
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "images/[name].[ext]"
          }
        }
      }
    ]
  },

  devtool: "eval-source-map",
  devServer: {
    contentBase: "./public",
    hot: true,
    host: "0.0.0.0",
    historyApiFallback: true
    // watchOptions: {
    //     aggregateTimeout: 300,
    //     poll: 1000
    // }
  },

  plugins: plugins
};
