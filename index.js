import express from 'express'
import MongoDB from './models/db.js';

const app = express();

MongoDB();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(4001, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server running');
    }
});