const path = require('path');
module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, 'src', 'client', 'app', 'index.tsx'),
  output: {
    path: path.join(__dirname, 'src', 'client', 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: path.join(__dirname, 'src', 'client', 'app'),
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'src', 'client', 'public')
  }
};
