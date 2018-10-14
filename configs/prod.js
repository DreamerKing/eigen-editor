const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const externals = {
    react: {
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
    },
    'react-dom': {
        root: 'ReactDOM',
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
    },
    'prop-types': {
        root: 'PropTypes',
        commonjs: 'prop-types',
        commonjs2: 'prop-types',
        amd: 'prop-types',
    },
};

const alias = {
    '@src': path.resolve(__dirname, '..', 'src'),
    '@lib': path.resolve(__dirname, '..', 'src/Dlib'),
    '@const': path.resolve(__dirname, '..', 'src/const'),
    '@renders': path.resolve(__dirname, '..', 'src/renders'),
    '@features': path.resolve(__dirname, '..', 'src/features'),
    '@tool-bar': path.resolve(__dirname, '..', 'src/tool-bar'),
    '@utils': path.resolve(__dirname, '..', 'src/utils'),
};

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    devtool: "eval-source-map",
    target: "web",
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        chunkFilename: 'chunck/[name][id].chunk.js',
        libraryTarget: 'umd',
        publicPath: "/dist/",
        library: 'EigenEditor',
        umdNamedDefine: true,
        filename: "index.js"
    },
   // externals,
    // performance: { 
    //     hints: "warning" 
    // },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            // chunks: 'initial',
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.[css|scss|less]$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
        // splitChunks: {
        //     chunks: 'async',
        //     minSize: 30000,
        //     minChunks: 1,
        //     maxAsyncRequests: 5,
        //     maxInitialRequests: 3,
        //     automaticNameDelimiter: '~',
        //     name: true,
        //     chunks: 'all',
        //     cacheGroups: {
        //         vendors: {
        //             test: /[\\/]node_modules[\\/]/,
        //             priority: -10
        //         },
        //         styles: {
        //             name: 'eigen-editor',
        //             test: /\.css$/,
        //             chunks: 'all',
        //             enforce: true
        //         },
        //         default: {
        //             minChunks: 2,
        //             priority: -20,
        //             reuseExistingChunk: true
        //         }
        //     }
        // }
    //},
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"]

            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-hot-loader", { loader: MiniCssExtractPlugin.loader }, { loader: "css-loader", options: { modules: true, importLoaders: 1 } }, { loader: "less-loader", options: { javascriptEnabled: true } }]
            },
            {
                test: /\.css$/,
                use: ["css-hot-loader",{ loader: MiniCssExtractPlugin.loader }, "css-loader"]
            },
            {
                test: /\.scss$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, "css-hot-loader", { loader: "css-loader", options: { modules: true, importLoaders: 1 }}, {loader: "postcss-loader", options: {
                        sourceMap: true
                    }}, {loader: "sass-loader", options: {
                        sourceMap: true
                    }}]
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        publicPath: path.resolve(__dirname, "../demo/dist/assets"),
                        mimetype: 'application/font-woff',
                        name: '[name].[ext]'
                    }
                }]
            }
        ]
    },
    resolve: {
        alias
    },
    plugins: [
       // new webpack.optimize.AggressiveMergingPlugin(),
        new MiniCssExtractPlugin({
            filename: "styles/[name].css",
            chunkFilename: "styles/[name][id].css"
        })
    ]
}