const { User, Ticket, OrderDetail } = require("../models");

class UserController {
  static async registerUserPubllic (req, res, next) {
    try {
      const { username, fullName, email, password, phoneNumber} = req.body;
      const createCust = await User.create({
        username,
        fullName,
        email,
        password,
        phoneNumber,
        role: "customer"
      });
      res.status(201).json({
        message: `user ${createCust.fullName} has been created successfully`
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

module.exports = UserController;