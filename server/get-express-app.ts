import axios from 'axios';
import express from 'express';
import { readFile } from 'fs';
import { join } from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App, AppProps } from '../client/components/App';

const staticPath = join(__dirname, '..');
const indexPath = join(staticPath, 'index.html');

export default () => {
    const app = express();

    app.use(express.static(staticPath));
    app.use('/:id', (req, res) => {
        const { id } = req.params;

        // TODO Extract url to configuration
        return axios
            .get(`https://carlescapellas.xyz/joke/${id}?$modena=jokify-api`)
            .then(response => {
                readFile(indexPath, 'utf8', (error, fileContents) => {
                    if (error) {
                        console.error(error);
                        return res.sendFile(indexPath);
                    }

                    const appProps: Partial<AppProps> = {
                        initialJoke: response.data
                    };
                    const serializedApp = ReactDOMServer.renderToString(
                        React.createElement(App, appProps as AppProps)
                    );

                    return res.send(
                        fileContents.replace(
                            '<div id="app-placeholder"></div>',
                            `<div id="app-placeholder">${serializedApp}</div>`
                        )
                    );
                });
            })
            .catch(error => {
                console.log(error);
                return res.sendFile(indexPath);
            });
    });

    return app;
};
