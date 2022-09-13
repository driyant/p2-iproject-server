const { User, Ticket, OrderDetail } = require("../models");

class OrderDetailController {
  static async index(req, res, next) {
    res.send("order detail");
  }
}

module.exports = OrderDetailController;
