const express = require('express');

const { longComputation } = require('./long_computation');

const app = express();

app.get('/one', (req, res) => {
    const sum = longComputation();

    res.send({sum});
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});


console.log(`worker id ${process.pid}`);