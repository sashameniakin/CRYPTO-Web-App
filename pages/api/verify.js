import connectDB from "./_db/connect-db";
import {User} from "./_db/models/User";
import jwt from "jsonwebtoken";

async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const oldUser = await User.findOne({_id: req.body.id});
        if (!oldUser) {
          return res.json({status: "User Not Exists!"});
        }
        try {
          const secret = process.env.JWT_SECRET + oldUser.password;
          const verify = jwt.verify(req.body.token, secret);

          res.json({status: "ok"});
        } catch (error) {
          res.json({error: "Not Verified!"});
        }
      } catch (error) {
        res.status(405).json({error: "method not allowed"});
      }
      break;
    default:
      res.status(405).json({error: "method not allowed"});
  }
}

export default connectDB(handler);
