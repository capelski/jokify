const merge = require('webpack-merge');
const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const jokes = require('../src/jokes.json');
const baseConfig = require('./base.config');

const routes = jokes.map((x, index) => `/jokify/${index + 1}`);

module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new PrerenderSPAPlugin({
            staticDir: path.resolve(__dirname, '..', 'docs'),
            routes
        })
    ]
});
