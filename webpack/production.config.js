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
            routes,
            postProcess: renderedRoute => {
                const urlParts = renderedRoute.route.split('/');
                const jokeId = urlParts[urlParts.length - 1];
                renderedRoute.outputPath = path.join(__dirname, '..', 'docs', jokeId, 'index.html');
                return renderedRoute;
            },
            staticDir: path.resolve(__dirname, '..', 'docs')
        })
    ]
});
