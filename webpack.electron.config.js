const path = require('path');


module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map',
  entry: './electron/main.ts',
  target: 'electron-main',
  externals: { 
    'npm':'commonjs npm', 
    'aws-sdk':'commonjs aws-sdk',
  },

  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },

      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.cs$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  }
};