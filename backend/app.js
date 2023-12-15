import express from 'express';
import indexRouter from './routes/index.js';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200', 'https://qa-course-work.onrender.com']
}));

app.use('/', indexRouter);

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'built', 'public', 'index.html'));
});

const port = 5000;

app.listen(port, () => {
    console.log('Website served on http://localhost:' + port);
});