const errors = ((err, req, res, next) => {
  res.status(500).json({
    message: "Internal server error"
  })
});

module.exports = errors;