const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    devtool: 'source-map',
    entry: path.join(__dirname, 'src', 'client', 'app', 'index.jsx'),
    output: {
        path: path.join(__dirname, 'src', 'client', 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
        })
      ],
    module: {
        rules: [
            {
            test: /\.jsx?/,
            include: path.join(__dirname, 'src', 'client', 'app'),
            use: 'babel-loader'
        },
        {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader"
            ]
          }
    ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'src', 'client', 'public'),
        inline:true,
        port: 3000,
        compress: true,
      },
      devtool: "source-map"   
};