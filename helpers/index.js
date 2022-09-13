const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'AAx31z31fZ1@#!$Asr!$';

const hashedPassword = (password) => {
  return bcrypt.hashSync(password, 10);
}

const checkPasswordHashed = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}

const createToken = (payload) => {
  return jwt.sign(payload, secretKey);
}

const verifyPayload = (token) => {
  return jwt.verify(token, secretKey);
}

module.exports = {
  hashedPassword,
  checkPasswordHashed,
  createToken,
  verifyPayload
}