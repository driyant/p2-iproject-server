const router = require("express").Router();
const error = require("../middlewares/errors");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");
const TicketController = require("../controllers/TicketController");
const OrderDetailController = require("../controllers/OrderDetailController");


// Route User
router.get("/user", UserController.index);
router.post("/user/public/register", UserController.registerUserPubllic);
router.post("/user/admin/register", UserController.registerUserAdmin);
router.put("/user/admin/edit/:id", UserController.editUserAdmin);

// Route Ticket
router.get("/ticket", TicketController.index);

// Route OrderDetail
router.get("/order-detail", OrderDetailController.index);

// Error Handler`
router.use(error)

module.exports = router;
