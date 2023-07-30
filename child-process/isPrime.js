process.env.UV_THREADPOOL_SIZE=3;

process.on('message', message => {
    const result = isPrime(message);
    process.send(result);
    process.exit();
});

function isPrime(number) {
    const startTime = new Date();
    let endTime;

    let isNumberPrime = true;

    for (let i=2; i<number; i++) {
        if (number % i === 0) {
            isNumberPrime = false;
            break;
        }
    }

    endTime = new Date();

    return {
        number,
        isPrime: isNumberPrime,
        time: endTime.getTime() - startTime.getTime()
    }
}