const express = require('express');
const { join } = require('path');

module.exports = () => {
    const app = express();
    app.use('/', express.static(join(__dirname, 'dist')));
    app.use('/:id', (req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')));
    return app;
};
