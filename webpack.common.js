const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
	mode: 'production',
	entry: {
		app: './src/app.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'index.html'),
					to: path.resolve(__dirname, 'dist')
				}
			]			
		}),
		new webpack.DefinePlugin({
			'typeof CANVAS_RENDERER': JSON.stringify(true),
			'typeof WEBGL_RENDERER': JSON.stringify(true)
		})
	],
	module: {
		rules: [{
			test: /\.(png|jpg|gif)$/,
			use: {
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]'
				}
			}
		}]
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		hot: false,
		liveReload: false
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	}
}


