const { parentPort } = require('worker_threads');

for (var counter = 0; counter < 20_000_000_000; counter++);

parentPort.postMessage(counter);