const path = require('path')
const nodeExternals = require('webpack-node-externals')
module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  performance: {
    hints: false,
  },
  devtool: 'nosources-source-map',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.ts', '.js', '.json'],
  },
  externals: [
    /^firebase.+$/,
    /^@google.+$/,
    /^@sendgrid.+$/,
    nodeExternals({
      allowlist: [/^@works/],
    }),
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../webpack/dist'),
    libraryTarget: 'commonjs',
  },
}
