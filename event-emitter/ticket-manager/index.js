const DatabaseService = require('./databaseService');
const EmailService = require('./emailService');
const TicketManager = require('./ticketManager');

const databaseService = new DatabaseService();
const emailService = new EmailService();
const ticketManager = new TicketManager(10);

(function() {
    ticketManager.on('message', function (data) {
        emailService.send(data.email, data.message);
    });
    
    ticketManager.on('buy', function (data) {
        databaseService.save(data.email, data.ticketsCount, data.price, data.timestamp);
        emailService.send(data.email, `${data.email} bought ${data.ticketsCount} ticket(s) at price ${data.price}/ticket`);
    });
    
    ticketManager.on('ticketsLeft', function (data) {
        console.log('Tickets Left', data);
    });
})();


ticketManager.buy(2, 'chauhan.kartik@gmail.com', 50);