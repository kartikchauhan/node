const DatabaseService = require('./databaseService');
const EmailService = require('./emailService');
const TicketManager = require('./ticketManager');

const databaseService = new DatabaseService();
const emailService = new EmailService();
const ticketManager = new TicketManager(10);

const onMessage = function (data) {
    emailService.send(data.email, data.message);
};

const onError = function (error) {
    console.error(error);
};

const onBuy = function (data) {
    databaseService.save(data.email, data.ticketsCount, data.price, data.timestamp);
    emailService.send(data.email, `${data.email} bought ${data.ticketsCount} ticket(s) at price ${data.price}/ticket`);
};

const onTicketsLeft = function (data) {
    console.log('Tickets Left', data);
};

function addListeners () {
    ticketManager.on('message', onMessage);
    ticketManager.on('error', onError);
    ticketManager.on('buy', onBuy);
    ticketManager.on('ticketsLeft', onTicketsLeft);
}

function removeListeners () {
    ticketManager.off('message', onMessage);
    ticketManager.off('error', onError);
    ticketManager.off('buy', onBuy);
    ticketManager.off('ticketsLeft', onTicketsLeft);
}

function listenersCount () {
    console.table({
        'Listener': ticketManager.listenerCount('buy'),
        'message': ticketManager.listenerCount('message')
    });
}

listenersCount();

addListeners();

listenersCount();

ticketManager.buy(2, 'chauhan.kartik@gmail.com', 50);

removeListeners();

listenersCount();
