const express = require('express');
const { fork } = require('child_process');

const app = express();

app.get('/isPrime', function(req, res) {
    const number = +req.query.number;
    const child = fork('./isPrime.js');

    child.send(number);
    child.on('message', response => {
        res.send(response);
    });
});

app.listen(3010, () => {
    console.log('app listening on port 3010!');
});


