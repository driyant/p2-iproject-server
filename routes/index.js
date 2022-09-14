const router = require("express").Router();
const error = require("../middlewares/errors");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const UserController = require("../controllers/UserController");
const TicketController = require("../controllers/TicketController");
const OrderDetailController = require("../controllers/OrderDetailController");
const LoginController = require("../controllers/LoginController");
const ContactController = require("../controllers/ContactController");


// Route User
// router.get("/user", UserController.index);
router.post("/user/public/register", UserController.registerUserPubllic);
// router.post("/user/admin/register", UserController.registerUserAdmin);
router.post("/user/login", LoginController.login);
// router.put("/user/admin/edit/:id", authentication, authorization, UserController.editUserAdmin);

// Route Ticket
router.get("/ticket", TicketController.index);
router.post("/ticket", authentication, TicketController.create);

// Route OrderDetail
// router.get("/order", authentication, OrderDetailController.create);

// Route message
router.post("/contact", ContactController.create);

// Error Handler`
router.use(error)

module.exports = router;
