import connectDB from "./_db/connect-db";
import {User} from "../api/_db/models/User";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const email = req.body;

        const oldUser = await User.findOne({email});
        if (!oldUser) {
          return res.json({status: "User Not Exists!"});
        }
        const secret = process.env.JWT_SECRET + oldUser.password;
        const token = jwt.sign(
          {email: oldUser.email, id: oldUser._id},
          secret,
          {expiresIn: "5m"}
        );
        const link = `https://crypto10.vercel.app/resetPassword/${oldUser._id}/${token}`;
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "apptester652@gmail.com",
            pass: "zxyqapdxuspnpebo",
          },
        });

        var mailOptions = {
          from: "youremail@gmail.com",
          to: email,
          subject: "Password Reset",
          text: link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.json({status: "ok"});
      } catch (error) {
        res.status(500).json({error: error.message});
      }
      break;
    default:
      res.status(405).json({error: "method not allowed"});
  }
}

export default connectDB(handler);
