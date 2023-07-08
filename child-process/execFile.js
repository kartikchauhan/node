const { execFile } = require('child_process');

execFile('./run.sh', function(err, stdout, stderr) {
    if (err) {
        console.log('\n--- err', err);
        console.log('\n');

        return;
    }

    if (stderr) {
        console.log('\n--- stderr', stderr);
        console.log('\n');

        return;
    }

    console.log('\n--- stdout', stdout);
    console.log('\n');
});