const path = require('path')
const fs = require('fs')

const nodeModules = {}
fs
  .readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(module => {
    nodeModules[module] = `commonjs ${module}`
  })

module.exports = {
  mode: 'none',
  target: 'node',
  entry: './src/server/server.js',
  output: {
    filename: 'server.bundle.js',
    path: path.join(__dirname, '..', 'dist')
  },
  node: {
    __filename: true,
    __dirname: true
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-0']
            }
          }
        ]
      }
    ]
  },
  plugins:[]
}