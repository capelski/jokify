const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        after: app => {
            app.get(/^\/jokify\/[0-9]+$/, function(req, res) {
                res.sendFile(path.resolve(__dirname, '..', 'docs', 'index.html'));
            });
        },
        publicPath: '/jokify',
        open: true,
        openPage: 'jokify'
    }
});
