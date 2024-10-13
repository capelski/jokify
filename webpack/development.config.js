const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        setupMiddlewares: function (middlewares, devServer) {
            devServer.app.get(/^\/jokify\/[0-9]+$/, function(_req, res) {
                res.sendFile(path.resolve(__dirname, '..', 'docs', 'index.html'));
            });
            return middlewares;
        },
        open: '/jokify/'
    }
});
