const { User, Ticket, OrderDetail } = require("../models");

class TicketController {
  static async index (req, res, next) {
    res.send('ticket conroller');
  }
}

module.exports = TicketController;