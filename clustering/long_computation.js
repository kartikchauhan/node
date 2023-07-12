function longComputation () {
    let sum = 0;
    
    for (let i=0; i<5_000_000_000; i++) {
        sum += i;
    }

    return sum;
}

module.exports = { longComputation };