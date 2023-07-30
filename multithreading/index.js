const express = require('express');
const { Worker, workerData } = require('worker_threads');
const os = require('os');

const app = express();

const THREAD_COUNT = os.cpus().length;

console.log('THREAD_COUNT', THREAD_COUNT);

app.get('/non_blocking', (req, res) => {
    res.send('Executing non blocking code');
});

app.get('/blocking', async (req, res) => {
    for (var counter = 0; counter < 20_000_000_000; counter++);

    res.send(`Executing blocking code ${counter}`);
});

app.get('/blocking_threads', async (req, res) => {
    const workers = [];

    for (let i=0; i<THREAD_COUNT; i++) {
        workers.push(createWorker());
    }

    let result = await Promise.all(workers);

    console.log(`${result[0]}, ${result[1]}, ${result[2]}, ${result[3]}`);

    res.send({result: result[0] + result[1] + result[2] + result[3]});
});

app.listen(3010, () => {
    console.log('Server is running on port 3010');
    console.log('pid', process.pid);
});

function createWorker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./four_workers', {
            workerData: {
                thread_count: THREAD_COUNT,
            }
        });

        worker.on('message', (data) => {
            resolve(data);
        });

        worker.on('error', (err) => {
            reject(err.message || err);
        });
    });
}