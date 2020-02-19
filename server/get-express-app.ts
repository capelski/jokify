import axios from 'axios';
import express from 'express';
import { readFile } from 'fs';
import { join } from 'path';

const indexPath = join(__dirname, 'index.html');

export default () => {
    const app = express();

    app.use(express.static(__dirname));
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

                    // Ideally, we would replace the following div with the server rendered version of the app.
                    // Given we are using BrowserRouter however, we will settle with sending part of the html
                    const replacedHtml = fileContents
                        .replace(
                            '<div id="app-placeholder"></div>',
                            `<div id="app-placeholder">
<div class="joke">${response.data.text
                                .map(
                                    (paragraph: string) =>
                                        `<p class="joke-paragraph">${paragraph}</p>`
                                )
                                .join('')}</div>
</div>`
                        )
                        .replace(
                            /<meta name="description" [^>]*\/>/,
                            `<meta name="description" content="${response.data.text.join(
                                ' / '
                            )}" />`
                        );

                    return res.send(replacedHtml);
                });
            })
            .catch(error => {
                console.log(error);
                return res.sendFile(indexPath);
            });
    });

    return app;
};
