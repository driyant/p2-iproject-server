const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models");

const authentication = async (req, res, next) => {
  const { access_token } = req.headers;
  try {
    const payload = verifyPayload(access_token);
    if (!payload) {
      throw {
        name: "JsonWebTokenError",
      };
    }
    const findUser = await User.findOne({
      where: {
        id: Number(payload.id),
      },
    });
    req.user = {
      id: findUser.id,
      email: findUser.email,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
