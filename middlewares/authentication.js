const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models");
const { verifyPayload } = require("../helpers");

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
      role: findUser.role
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
