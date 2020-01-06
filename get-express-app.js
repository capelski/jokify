const express = require('express');
const { join } = require('path');

module.exports = () => {
	const app = express();
    app.use('/', express.static(join(__dirname, 'dist')));
	app.use('/search', (req, res) => res.sendFile(join(__dirname, 'dist', 'search.html')));
	return app;
};
