import express from 'express';
import { join } from 'path';

export default () => {
    const app = express();
    app.use('/', express.static(__dirname));
    app.use('/:id', (req, res) => res.sendFile(join(__dirname, 'index.html')));
    return app;
};
