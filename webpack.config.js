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
            },
            {
                test: /.css$/,
                loader: 'style!css'
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

if(process.env.NODE_ENV === 'development') {
    config.devtool = 'source-map'
}

if(process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: true
    }))
    config.output.filename = '[name].min.js'
}

module.exports = config