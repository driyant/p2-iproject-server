const { User, Ticket, OrderDetail } = require("../models");

class TicketController {
  static async index (req, res, next) {
    try {
      const tickets = await Ticket.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      });
      res.status(200).json(tickets)
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async create (req, res, next) {
    console.log(req.body);
  }
}

module.exports = TicketController;