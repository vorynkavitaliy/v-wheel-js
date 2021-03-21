const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const mainPath = isDev ? 'dist' : 'public'
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`)

const PATHS = {
    js: 'js',
    img: `${mainPath}/img`,
    css: 'css',
    fonts: `${mainPath}/fonts`,
}

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
    }

    if (isProd) {
        config.minimizer = [new CssMinimizerPlugin(), new TerserWebpackPlugin()]
    }

    return config
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            filename: `index.html`,
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `${PATHS.css}/${filename('css')}`,
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, 'src/assets/images'),
        //             to: path.join(__dirname, PATHS.img),
        //         },
        //     ],
        // }),
    ]

    return base
}

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: ``,
            },
        },
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    config: path.resolve(__dirname, 'postcss.config.js'),
                },
            },
        },
    ]

    if (extra) {
        loaders.push(extra)
        if (extra.loader === 'sass-loader') {
            loaders.push({
                loader: 'sass-resources-loader',
                options: {
                    resources: [path.resolve(__dirname, './src/styles/styles.sass')],
                },
            })
        }
    }

    return loaders
}

const babelOptions = (preset) => {
    const opts = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOptions(),
        },
    ]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        index: ['@babel/polyfill', './index.js'],
    },
    output: {
        filename: `${PATHS.js}/${filename('js')}`,
        path: path.resolve(__dirname, mainPath),
    },
    optimization: optimization(),
    devServer: {
        port: 4202,
        hot: isDev,
        liveReload: true,
    },
    devtool: isDev && 'source-map',
    plugins: plugins(),
    resolve: {
        extensions: ['.js', '.vue', '.png', '.jpg', '.svg', '.css', '.sass', '.scss'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders({
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            indentedSyntax: true,
                        },
                    },
                }),
            },

            // {
            //     test: /\.(png|jpg|svg|gif)$/i,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 esModule: false,
            //                 name: '[name].[ext]',
            //                 outputPath: `../img/`,
            //             },
            //         },
            //     ],
            // },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loader: {
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    },
                },
            },

            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
        ],
    },
}
