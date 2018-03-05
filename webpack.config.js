var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var cssnano = require('cssnano');

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body',
	minify:{   
    	removeComments:false,   
    	collapseWhitespace:false    
  	}
});
var WebpackBootstrapConfig = new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default'],
    Util: "exports-loader?Util!bootstrap/js/dist/util",
    Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
    Button: "exports-loader?Button!bootstrap/js/dist/button",
    Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
    Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
    Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
    Index: "exports-loader?Index!bootstrap/js/dist/index",
    Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
    Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
    Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
    Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
    Tooltip: "exports-loader?Tropdown!bootstrap/js/dist/tooltip"
});

module.exports = {
	entry: [
		__dirname + '/app/index.js',
		__dirname + '/app/scss/style.scss'
	],
	output: {
		filename: 'js/app.min.js',
		path: __dirname + '/build'
	},
	module: {
		loaders: [
			{
        		test: /\.(js|jsx)?$/,
        		loader: "babel-loader",
        		exclude: /node_modules/,
        		query: {
					presets: [
						[
      					"env",
      						{
        						"targets": {"uglify": true }
      						}
    					], 
    					'es2015', 
    					'es2016', 
    					"stage-1",
    					'react'
    				],
    				plugins: [
					    "transform-runtime"
					]
				}
      		},
      		{
        		test: /\.(sass|scss)$/,
        		loader: ExtractTextPlugin.extract({
          			fallback: 'style-loader',
          			use: ['css-loader', 'sass-loader']
        		})
      		},
      		{
        		test: /\.css/,
        		loader: ExtractTextPlugin.extract({
          			fallback: "style-loader",
          			use: "css-loader"
        		})
      		},
			// { 
	  //       	test: /\.css$/, 
	  //       	loader: "style-loader!css-loader!autoprefixer-loader" 
	  //     	},
	  //     	{
			//   	test: /\.(sass|scss)$/,
			//   	loader: "style-loader!css-loader!sass-loader!autoprefixer-loader"
			// },
	      	{ 
	        	test: /\.(png|jpg|gif)$/, 
	        	loader: "url-loader?limit=100000" 
	      	},
	      	{ 
		        test: /\.(png|jpg|gif)$/, 
		        loader: "file-loader" 
	      	},
	      	{
			  	test: /\.html$/,
			  	loader: "html-loader"
			},
			{
			  	test: require.resolve("lodash"),
			  	loader: 'expose?_'
			},
	      	{
	        	test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
	        	loader: 'url?limit=10000&mimetype=application/font-woff'
	      	},
	      	{
	        	test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
	        	loader: 'url?limit=10000&mimetype=application/octet-stream'
	      	},
	      	{
	        	test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
	        	loader: 'file'
	      	},
	      	{
	       	 	test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
	        	loader: 'url?limit=10000&mimetype=image/svg+xml'
	      	}
		]
	},
	plugins: [
		HTMLWebpackPluginConfig, 
		WebpackBootstrapConfig,
		new ExtractTextPlugin({
	      	filename: 'css/style.min.css',
	      	allChunks: true,
	    })
	   //  new webpack.optimize.UglifyJsPlugin({
	   //  	minimize: true,
	   //  	compress: { warnings: false },
	   //  	include: /\.min\.js$/,
	   //  	exclude: /node_modules/,
	   //  	sourceMap: true,
	  	// }),
	  	// new OptimizeCssAssetsPlugin({
	   //  	assetNameRegExp: /\.min\.css$/g,
	   //  	cssProcessor: require('cssnano'),
    //   		cssProcessorOptions: { discardComments: { removeAll: true } },
    //   		canPrint: true
	  	// })
	]
};