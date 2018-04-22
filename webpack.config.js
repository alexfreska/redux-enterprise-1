module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    filename: './lib/index.js'
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      { test: /\.(t|j)s$/, use: { loader: 'awesome-typescript-loader' } },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  devtool: "source-map"
}
