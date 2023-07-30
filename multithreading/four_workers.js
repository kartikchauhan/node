const { parentPort, workerData } = require('worker_threads');

for (var i=0; i<20_000_000_000/workerData.thread_count; i++);

parentPort.postMessage(i);

