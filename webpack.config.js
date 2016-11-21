var webpack = require('webpack')

var config = {
    entry: {
        'js2wordcloud': './src/main.js'
    },
    output: {
        filename: '[name].js',
        path: './dist',
        library: 'Js2WordCloud',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: require.resolve('./src/wordcloud2.js'),
                loader: 'imports?this=>window'
            }
        ]
    },
    resolve: {
        alias: {
            wordcloud2: '/src/wordcloud2.js'
        }
    },
    plugins: [
    ]
}

if (process.env.NODE_ENV === 'development') {
    config.devtool = 'source-map'
}

module.exports = config