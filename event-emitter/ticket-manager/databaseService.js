class DatabaseService {
    save(email, ticketsCount, price, timestamp) {
        console.log(`Running Query: INSERT INTO orders VALUES (${email}, ${ticketsCount}, ${price}, ${timestamp});`);
    }
}

module.exports = DatabaseService;