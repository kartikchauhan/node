const EventEmitter = require('events');

class TicketManager extends EventEmitter {
    constructor(supply = 20) {
        super();
        this.supply = supply;
    }

    buy(ticketsCount, email, price) {
        if (this.supply - ticketsCount < 0) {
            this.emit('message', { message: `Not enough tickets available | Tickets available: ${this.supply}`, email });
            return;
        }

        this.supply -= ticketsCount;
        this.emit('buy', { ticketsCount, email, price, timestamp: Date.now()});
        this.ticketsLeft();
    }

    ticketsLeft() {
        this.emit('ticketsLeft', this.supply);
    }
}

module.exports = TicketManager;