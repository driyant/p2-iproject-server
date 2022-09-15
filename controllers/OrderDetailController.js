const { User, Ticket, OrderDetail } = require("../models");
const axios = require("axios");
const Xendit = require("xendit-node");
const nodemailer = require("nodemailer");
const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);

class OrderDetailController {
  static async index(req, res, next) {
    const { id: UserId } = req.user;
    try {
      const orderDetails = await OrderDetail.findAll({
        where: {
          UserId: Number(UserId),
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Ticket,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: User,
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(200).json(orderDetails);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async create(req, res, next) {
    const { TicketId } = req.params;
    const { id } = req.user;
    try {
      const findTicketInOrder = await Ticket.findOne({
        where: {
          TicketId: TicketId,
        },
      });
      if (!findTicketInOrder) {
        throw {
          name: "TICKET_NOT_FOUND",
        };
      }
      const findOrderDetail = await OrderDetail.findOne({
        where: {
          TicketId: TicketId,
          UserId: id,
        },
      });
      if (findOrderDetail) {
        throw {
          name: "ORDER_ALREADY_EXIST",
        };
      }
      await OrderDetail.create({
        UserId: id,
        TicketId: TicketId,
        status: "unpaid",
      });
      res.status(201).json({
        message: "Order ticket has been created successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async updateStatus(req, res, next) {
    const { id } = req.params;
    try {
      const findOrder = await OrderDetail.findOne({
        where: {
          id: Number(id),
        },
        include: [
          {
            model: Ticket,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: User,
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"],
            },
          },
        ],
      });
      if (!findOrder) {
        throw {
          name: "ORDER_NOT_FOUND",
        };
      }
      if (findOrder.status === "paid") {
        throw {
          name: "ORDER_IS_ALREADY_PAID",
        };
      }
      let mailTransport = nodemailer.createTransport({
        host: `${process.env.HOST_MAIL}`,
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: `${process.env.USER_MAIL}`,
          pass: `${process.env.PASS_EMAIL}`,
        },
        tls: {
          rejectUnauthorized: true,
        },
      });
      let detail = {
        from: "dont-reply@helloriyan.my.id",
        to: `${findOrder.User.email}`,
        subject: "ORDER_TICKET_SUCCESS",
        text: `Hi, ${findOrder.User.fullName}. Your ticket ${findOrder.Ticket.ticketEvent} has been ordered. Venue: ${findOrder.Ticket.venue}. Time: ${findOrder.Ticket.time}`,
      };
      mailTransport.sendMail(detail, (err) => {
        if (err) {
          throw {
            name: "Something went wrong",
          };
        } else {
          console.log("success");
        }
      });
      client.messages
        .create({
          body: `Hi, ${findOrder.User.fullName}. Your ticket ${findOrder.Ticket.ticketEvent} has been ordered. Venue: ${findOrder.Ticket.venue}. Time: ${findOrder.Ticket.time}`,
          from: `${process.env.FROM_SMS}`,
          to: `${process.env.TO_SMS}`,
        })
        .then((message) => console.log(message.sid));
      await findOrder.update(
        {
          status: "paid",
        },
        {
          where: {
            id: Number(id),
          },
        }
      );
      res.status(200).json({
        message: "success update ticket",
      });
      const x = new Xendit({
        secretKey: `${process.env.API_KEY_PAY}`,
      });
      const { QrCode } = x;
      const qrcodeSpecificOptions = {};
      const q = new QrCode(qrcodeSpecificOptions);
      const resp_X = await q.createCode({
        externalID: `ORDER_TESTING_1112310_${new Date().getTime()}`,
        type: QrCode.Type.Dynamic,
        callbackURL: "https://localhost:5173/callback",
        amount: `${findOrder.Ticket.price}`,
      });
      await q.simulate({
        externalID: `${resp_X.external_id}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = OrderDetailController;
