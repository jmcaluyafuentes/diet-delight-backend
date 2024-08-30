import app from './app.js'

app.listen(4001, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server running');
    }
});
