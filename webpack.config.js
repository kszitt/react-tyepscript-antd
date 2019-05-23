const webpack = require("webpack");
const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const TerserJSPlugin = require("terser-webpack-plugin");
const Config = require("./config");
const {MODE, SERVER, TEST} = process.env;
const IsDevelopment = MODE === "development";


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

const LessLoader = {
  loader: "less-loader",
  options: {
    javascriptEnabled: true,
    // modifyVars: <color> // antd 自定义主题颜色
  }
};


const webpackConfig = {
  entry: {
    build: [
      "webpack/hot/only-dev-server",
      `webpack-dev-server/client?http://${Config.ip}:${Config.port}`,
      path.resolve(__dirname, "./src/index.tsx"),
    ]
  },
  output: {
    path: __dirname,
    filename: "static/js/[name].[hash:8].js",
    chunkFilename: "static/js/[name].[hash:8].js",
    publicPath: "/"
  },
  mode: MODE,
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: [
          "babel-loader"
        ],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: [
          "source-map-loader"
        ],
      },
      {
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
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, "src"),
        ],
        use: [
          CssExtractLoader,
          "css-loader",
          PostcssLoader,
          "sass-loader"
        ]
      },
      {
        test: /\.less$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/antd")
        ],
        use: [
          CssExtractLoader,
          "css-loader",
          PostcssLoader,
          LessLoader
        ]
      },
      {
        test: /\.(woff|svg|ttf|eot|woff2)(\?.*)?$/,
        loader: "url-loader",
        exclude: /node_modules/,
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
    host: Config.ip,
    port: Config.port,
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
      filename: "static/css/[name].[hash].css",
      chunkFilename: "static/css/[id].[hash].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      favicon: "./src/assets/kszitt.ico",
      inject: true,
      template: "index.html",
      react: `https://unpkg.com/react@16/umd/react.${IsDevelopment ? "development" : "production.min"}.js`,
      reactDom: `https://unpkg.com/react-dom@16/umd/react-dom.${IsDevelopment ? "development" : "production.min"}.js`,
      minify:  IsDevelopment ? false : {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      },
      hash: false
    }),
    new ImageminPlugin({
      disable: !IsDevelopment,
      pngquant: {
        quality: "50-60"
      }
    })
  ],
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};

if(!IsDevelopment){
  if(!SERVER) webpackConfig.entry.build.splice(0, 2);
  webpackConfig.output.path = path.resolve(__dirname, "frontend");
  webpackConfig.output.publicPath = SERVER ? "/" : (TEST ? "./" : "/frontend/");
  if(!SERVER) webpackConfig.plugins.splice(0, 1);
  webpackConfig.optimization = {
    minimizer: [
      new TerserJSPlugin(),
      new OptimizeCSSAssetsPlugin()
    ],
  }
}

module.exports = webpackConfig;
