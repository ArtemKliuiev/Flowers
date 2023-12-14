import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const paths = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'dist'),
};

export const webpackConfig = (isMode) => {
  return {
    entry: {
      main: path.join(paths.src, 'js/main.js'),
      app: path.join(paths.src, 'js/app.js'),
      productCard: path.join(paths.src, 'js/productCard.js'),
      catalog: path.join(paths.src, 'js/catalog.js'),
      registration: path.join(paths.src, 'js/registration.js'),
      sing: path.join(paths.src, 'js/sing.js'),
      news: path.join(paths.src, 'js/news.js'),
    },

    mode: isMode ? 'development' : 'production',

    output: {
      path: path.join(paths.build, 'js'),
      filename: '[name].min.js',
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,

          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },

          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
    devtool: isMode ? 'source-map' : 'cheap-source-map',
  };
};
