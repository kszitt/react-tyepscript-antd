const webpack = require("webpack");
const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const ImageminPlugin = require("imagemin-webpack-plugin").default;
const TerserJSPlugin = require("terser-webpack-plugin");
const Config = require("./config");
const {MODE, SERVER} = process.env;
const IsDevelopment = MODE !== "production";
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


const CssExtractLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    hmr: IsDevelopment,
    // reloadAll: true,
  }
};

const PostcssLoader = {
  loader: "postcss-loader",
  options: {
    plugins: function () {
      return [
        autoprefixer
      ];
    }
  }
};


const webpackConfig = {
  entry: [
    "react-hot-loader/patch",
    path.resolve(__dirname, "./src/index.tsx"),
  ],
  output: {
    path: path.resolve(__dirname, "frontend"),
    filename: IsDevelopment?"static/js/[name].js": "static/js/build.[hash:8].js",
    chunkFilename: "static/js/[name].[hash:8].js",
    publicPath: "/"
  },
  mode: IsDevelopment ? "development" : "production",
  devtool: IsDevelopment ? "cheap-module-source-map" : "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [
      new TsconfigPathsPlugin()
    ],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.j|tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        ],
      },{
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, "src"),
        ],
        use: [
          CssExtractLoader,
          "css-loader",
          PostcssLoader,
          "sass-loader",
        ]
      },{
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/antd")
        ],
        use: [
          CssExtractLoader,
          "css-loader",
          PostcssLoader,
        ]
      }, {
        test: /\.(woff|svg|ttf|eot|woff2)(\?.*)?$/,
        loader: "url-loader",
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/tabler-react")
        ],
        query: {
          limit: 5000,
          name: "static/font/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        loader: "url-loader",
        exclude: /node_modules/,
        query: {
          limit: 5000,
          name: "static/image/[name].[hash:8].[ext]"
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'frontend'),
    host: Config.ip,
    port: Config.port,
    historyApiFallback: true,
    hot:true,
    stats: {
      colors: true
    },
    proxy: Config.proxy.map(item => (
      {
        context: item.path,
        target: item.target,
        changeOrigin: true,
        secure: false
      }
    ))
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: `static/css/style${IsDevelopment ? "" : ".[hash:8]"}.css`,
      chunkFilename: `static/css/[id]${IsDevelopment ? "" : ".[hash:8]"}.css`,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      // favicon: "./src/assets/kszitt.ico",
      inject: true,
      template: "index.html",
      react: `https://unpkg.com/react@16/umd/react.${IsDevelopment ? "development" : "production.min"}.js`,
      reactDom: `https://apl-static.oss-cn-beijing.aliyuncs.com/react-dom.${IsDevelopment ? "development" : "production.min"}.js`,
      minify:  IsDevelopment ? false : {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      },
      hash: false
    }),
    /*new ImageminPlugin({
      disable: !IsDevelopment,
      pngquant: {
        quality: "50-60"
      }
    }),*/
  ],
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};

if(!IsDevelopment){
  if(!SERVER) {
    webpackConfig.entry.splice(0, 1);
    webpackConfig.plugins.splice(0, 1);
  }
  webpackConfig.optimization = {
    minimizer: [
      new TerserJSPlugin(),
      new OptimizeCSSAssetsPlugin()
    ],
  }
}

module.exports = webpackConfig;
