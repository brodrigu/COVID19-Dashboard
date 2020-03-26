const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'eval-source-map',
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
    },
});
