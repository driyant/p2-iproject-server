const { User, Ticket, OrderDetail } = require("../models");

class OrderDetailController {
  static async index(req, res, next) {
    try {
      const orderDetails = await OrderDetail.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Ticket,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            }
          },
          {
            model: User,
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(200).json(orderDetails);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async create(req, res, next) {
    const { TicketId } = req.params;
    const { id } = req.user;
    try {
      await OrderDetail.create({
        UserId: id,
        TicketId: TicketId,
        status: "unpaid"
      })
      res.status(201).json({
        message: "Order ticket has been created successfully"
      })
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = OrderDetailController;
