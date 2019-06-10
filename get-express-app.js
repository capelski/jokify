const express = require('express');
const session = require('express-session');
const { readdirSync, writeFile } = require('fs');
const { render } = require('node-sass');
const { join } = require('path');
const jokesController = require('./controllers/joke-controller');

const defaultConfig = {
    SESSION_SECRET: 'to be replaced with environment variables',
};

const compileSassFile = (inputFile, outputFile) => {
    render({
        file: inputFile
    }, (renderError, result) => {
        if (renderError) {
            console.error(renderError);
        }
        else {
            writeFile(outputFile, result.css.toString(), fileError => {
                if (fileError) {
                    console.error(fileError);
                }
            });
        }
    });
};

const compileSassFiles = () => {
    const inputDirectory = join(__dirname, 'sass');
	const outputDirectory = join(__dirname, 'public', 'css');
	const filenames = readdirSync(inputDirectory);

    filenames.forEach(filename => {
        const inputFile = join(inputDirectory, filename);
        const outputFile = join(outputDirectory, filename.replace('.scss', '.css'));
        compileSassFile(inputFile, outputFile);
    });
};

module.exports = (environmentConfig = {}) => {
	compileSassFiles();
	const app = express();
	app.set('view engine', 'ejs');
    app.use('/', express.static(join(__dirname, 'public')));
    app.use(session({
        secret: environmentConfig.SESSION_SECRET || defaultConfig.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
	}));
	app.get('/', jokesController.indexView);
	app.get('/api/filter', jokesController.filteredJokes);
	app.get('/api/random', jokesController.randomJoke);
	return app;
};
