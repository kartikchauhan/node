const { spawn } = require('child_process');

const child = spawn('ls', ['-al']);

child.stdout.on('data', function(data) {
    console.log(`stdout ${data}`);
    console.log('\n');
});

child.stderr.on('data', function(data) {
    console.log(`stderr ${data}`);
    console.log('\n');
});

child.on('error', function(err) {
    console.log('\n--- err', err);
    console.log('\n');
});

child.on('exit', function(code, signal) {
    console.log('\n--- code', code);
    console.log('\n');

    console.log('\n--- signal', signal);
    console.log('\n');
});