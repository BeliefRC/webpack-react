const path=require('path')
const HTMLPlugin=require('html-webpack-plugin')
module.exports={
  target: 'node',
  entry:{
    app:path.join(__dirname,'../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname,'../dist'),
    publicPath: '/public ',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test:/\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude:[
          path.join(__dirname,'../node_modules')
        ]
      }
    ]
  }
}