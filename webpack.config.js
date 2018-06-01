const path = require('path');
const webpack = require('webpack');

const {
  FUSIONX_API_PORT,
  FUSIONX_API_USERNAME,
  FUSIONX_API_PASSWORD,
  FUSIONX_WEBSOCKET_PORT
} = process.env

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"',
        'FUSIONX_API_PORT': `"${FUSIONX_API_PORT}"`,
        'FUSIONX_API_USERNAME': `"${FUSIONX_API_USERNAME}"`,
        'FUSIONX_API_PASSWORD': `"${FUSIONX_API_PASSWORD}"`,
        'FUSIONX_WEBSOCKET_PORT': `"${FUSIONX_WEBSOCKET_PORT}"`
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};
