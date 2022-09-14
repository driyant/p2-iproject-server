const { User, Ticket, OrderDetail } = require("../models");

class TicketController {
  static async index(req, res, next) {
    try {
      const tickets = await Ticket.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(tickets);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async create(req, res, next) {
    const { ticketEvent, price, stock, venue, date, time } = req.body;
    console.log(req.body)
    try {
      await Ticket.create({
        ticketEvent, price, stock, venue, date, time
      });
      res.status(201).json({
        message: "Success create new event"
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  static async updateStock(req, res, next) {
    const { id } = req.params;
    const { stock } = req.body;
    try {
      const findTicket = await Ticket.findOne({
        where: {
          id: id
        }
      });
      if (!findTicket) {
        throw{
          name: "TICKET_NOT_FOUND"
        }
      }
      await Ticket.update({
        stock: Number(stock)
      }, {
        where: {
          id: id
        }
      });
      res.status(200).json({
        message: "Stock ticket has been updated"
      })
    } catch (error) {
      console.log(error);
      next(error);
    } 
  }
}

module.exports = TicketController;
