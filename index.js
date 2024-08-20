import express from 'express'

const app = express();

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