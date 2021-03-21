const autoprefixer = require('autoprefixer')
const sortMediaQueries = require('postcss-sort-media-queries')
const remover = require('postcss-remove-unused-css')
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
    plugins: [
        sortMediaQueries({
            sort: 'mobile-first',
        }),
        autoprefixer({
            Browserslist: {
                config: ['ie >= 8', 'last 4 version'],
            },
        }),

        isProd &&
            remover({
                path: './src',
                exts: ['.js', '.html', '.vue'],
            }),
    ],
    sourceMap: true,
}
