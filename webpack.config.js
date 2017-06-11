require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './app/index.tsx',
  ],
  output: {
    filename: './dst/bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
        options: {
          classPrefix: true
        }
      },
      {
        test: /\.html$/,
        use: ["raw-loader"]
      },
      {
        test: /\.md?$/,
        use: [
          { loader: "html-loader" },
          { loader: "markdown-loader" }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {loader: "isomorphic-style-loader"},
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[local]__[hash:base64:5]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer'),
                  require('postcss-flexbugs-fixes'),
                ];
              }
            }
          },
          { loader: "sass-loader" }
        ]
      }
    ],
  },
  node: {
    fs: "empty"
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.ejs',
      inject: false,
    }),
  ],
};