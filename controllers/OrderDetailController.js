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
}

module.exports = OrderDetailController;
