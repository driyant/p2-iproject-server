const { User, Ticket, OrderDetail } = require("../models");

class UserController {
  static async index (req, res, next) {
    res.send('hello world')
  }
  static async registerUserPubllic (req, res, next) {
    console.log(req.body)
    // const { username, fullName, email, password, phoneNumber} = req.body;
    try {
      // const createCust = await User.create({
      //   username,
      //   fullName,
      //   email,
      //   password,
      //   phoneNumber,
      //   role: "customer"
      // });
      // res.status(201).json({
      //   message: `user ${createCust.fullName} has been created successfully`
      // })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  static async registerUserAdmin (req, res, next) {
    console.log(req.body)
    const { username, fullName, email, password, phoneNumber} = req.body;
    try {
      // const createCust = await User.create({
      //   username,
      //   fullName,
      //   email,
      //   password,
      //   phoneNumber,
      //   role: "admin"
      // });
      // res.status(201).json({
      //   message: `user ${createCust.fullName} has been created successfully`
      // })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  static async editUserAdmin (req, res, next) {
    const { id } = req.params;
    const { username, fullName, email, password, phoneNumber} = req.body;
    // console.log(req.body);
    try {
      const findUserAdmin = await User.findOne({
        where: {
          id: Number(id)
        }
      });
      if (!findUserAdmin) {
        throw {
          err: "USER_NOT_FOUND"
        }
      }
      await User.update({
        username, fullName, email, password, phoneNumber
      }, {
        where: {
          id: Number(id)
        }
      });
      res.status(200).json({
        message: `user ${findUserAdmin.username} has been update sucessfully`
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;