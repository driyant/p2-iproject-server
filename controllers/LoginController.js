const { checkPasswordHashed, createToken } = require("../helpers");
const { User, Ticket, OrderDetail } = require("../models");

class LoginController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const findUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!findUser) {
        throw {
          name: "INVALID_USERNAME_OR_PASSWORD",
        };
      }
      const isValid = checkPasswordHashed(password, findUser.password);
      if (!isValid) {
        throw {
          name: "INVALID_USERNAME_OR_PASSWORD",
        };
      }
      const payload = {
        id: findUser.id,
      };
      const token = createToken(payload);
      res.status(200).json({
        access_token: token,
        role: findUser.role,
        email: findUser.email,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = LoginController;
