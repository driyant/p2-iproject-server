const nodemailer = require("nodemailer");

class ContactController {
  static async create(req, res, next) {
    try {
      const { email, subject, message } = req.body;
      console.log(req.body);
      let mailTransport = nodemailer.createTransport({
        host: process.env.HOST_MAIL,
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.PASS_EMAIL,
        },
        tls: {
          rejectUnauthorized: true,
        },
      });

      let detail = {
        from: "dont-reply@helloriyan.my.id",
        to: "message.driyant@outlook.com",
        subject: subject,
        text: `Hi, you have an email from ${email}. ${message}`,
      };

      mailTransport.sendMail(detail, (err) => {
        if (err) {
          console.log(`Something went wrong!`, err);
          res.status(500).json({
            message: "something went wrong",
          });
        } else {
          console.log("success");
          res.status(200).json({
            message: "success",
          });
        }
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ContactController;
