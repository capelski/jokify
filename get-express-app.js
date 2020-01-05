const express = require('express');
const { readdirSync, writeFile } = require('fs');
const { render } = require('node-sass');
const { join } = require('path');

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

module.exports = () => {
    compileSassFiles();
    
	const app = express();
    app.use('/', express.static(join(__dirname, 'public')));
	app.get('/search', (req, res) => res.sendFile(join(__dirname, 'public', 'search.html')));
	return app;
};
