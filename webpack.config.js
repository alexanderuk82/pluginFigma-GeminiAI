const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    code: './src/plugin/code.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: path.resolve(__dirname, './tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    minimize: false,
    concatenateModules: false,
    runtimeChunk: false,
    splitChunks: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'global': {}, // Fix for global is not defined
    }),
  ],
  devtool: false,
};
