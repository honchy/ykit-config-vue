'use strict';

exports.config = function (options, cwd) {
    var baseConfig = this.config;
    var vueQuery = 'babel-loader?presets[]=es2015,presets[]=es2017,presets[]=stage-0,presets[]=stage-1,presets[]=stage-2';
    var babelPresets = [
        'es2015',
        'es2017',
        'stage-0',
        'stage-1',
        'stage-2',
    ];

    if(!this.webpack.version || this.webpack.version < 2) {
        baseConfig.module.loaders = baseConfig.module.loaders.concat([
            {
                test: /\.vue$/,
                loader: require.resolve('vue-loader')
            }, {
                test: /\.js$/,
                loader: require.resolve('babel-loader'),
                query: {
                    presets: babelPresets
                },
                exclude: /node_modules/
            }
        ])
        baseConfig.vue = {
            loaders: {
                js: vueQuery
            }
        }
    } else {
        baseConfig.module.loaders = baseConfig.module.loaders.concat([
            {
                test: /\.vue$/,
                use: [{
                    loader: require.resolve('vue-loader'),
                    options: {
                        loaders: {
                            js: vueQuery
                        }
                    }
                }]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: require.resolve('babel-loader'),
                    query: {
                        presets:babelPresets
                    }
                }]
            }
        ])
    }

    baseConfig.devtool = '#eval-source-map'
    if (this.env === 'prd') {
        baseConfig.plugins = baseConfig.plugins.concat([
            new this.webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new this.webpack.optimize.OccurrenceOrderPlugin()
        ])
    }
};