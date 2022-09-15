const errors = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let message = "Internal server error";
  if (err.name === "INVALID_USERNAME_OR_PASSWORD") {
    code = 401;
    message = "Invalid username/password";
  } else if (err.name === "SequelizeValidationError") {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid token";
  } else if (err.name === "ORDER_ALREADY_EXIST") {
    code = 400;
    message = "This ticket order already exist";
  } else if (err.name === "ORDER_NOT_FOUND") {
    code = 404;
    message = "Order not found"
  } else if (err.name === "ORDER_IS_ALREADY_PAID") {
    code = 400;
    message = "Order has been paid"
  } else if (err.name === "TICKET_NOT_FOUND") {
    code = 404;
    message = "Ticket event not found";
  }
  res.status(code).json({
    message,
  });
};

module.exports = errors;
