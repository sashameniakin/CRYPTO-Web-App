import connectDB from "./_db/connect-db";
import {User} from "../api/_db/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
          return res.json({error: "User not found"});
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
          const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {
            expiresIn: 10,
          });
          console.log("passt");
          console.log(token);
          if (res.status(201)) {
            return res.json({status: "ok", data: token});
          } else {
            return res.json({error: "error"});
          }
        }

        res.json({status: "error", error: "Invalid Password"});
      } catch (error) {
        res.status(500).json({error: error.message});
      }
      break;
    default:
      res.status(405).json({error: "method not allowed"});
  }
}

export default connectDB(handler);
