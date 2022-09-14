const { User, Ticket, OrderDetail } = require("../models");

class OrderDetailController {
  static async index(req, res, next) {
    const { id:UserId } = req.user;
    try {
      const orderDetails = await OrderDetail.findAll({
        where: {
          UserId: Number(UserId),
          status: "unpaid"
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
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
      const findTicketInOrder = await Ticket.findOne({
        where: {
          id: TicketId,
        }
      });
      if (!findTicketInOrder) {
        throw {
          name: "TICKET_NOT_FOUND"
        }
      }
      const findOrderDetail = await OrderDetail.findOne({
        where: {
          TicketId: TicketId,
          UserId: id
        }
      });
      if (findOrderDetail) {
        throw {
          name: "ORDER_ALREADY_EXIST"
        }
      }
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
