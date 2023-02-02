import connectDB from "./_db/connect-db";
import {User} from "./_db/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const oldUser = await User.findOne({_id: req.body.id});
        if (!oldUser) {
          return res.json({status: "User not exists!"});
        }
        const secret = process.env.JWT_SECRET + oldUser.password;
        jwt.verify(req.body.token, secret);
        const encryptedPassword = await bcrypt.hashSync(req.body.password, 10);
        await User.updateOne(
          {
            _id: req.body.id,
          },
          {
            $set: {
              password: encryptedPassword,
            },
          }
        );
        res.json({status: "ok"});
      } catch (error) {
        res.json({error: error.message});
        res.json({error: "Something went wrong"});
      }
      break;
    default:
      res.status(405).json({error: "method not allowed"});
  }
}

export default connectDB(handler);
