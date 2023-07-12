const cluster = require('cluster');
const os = require('os');

const nCPUs = os.cpus().length;

console.log('Total number of CPUs', nCPUs);
console.log('Primary pid', process.pid);

cluster.setupPrimary({
    exec: __dirname + '/index.js',
})

for (let i = 0; i < nCPUs; i++) {
    cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} has been killed`);
    console.log(`Starting another worker`);
    cluster.fork();
});