import connectDB from "./_db/connect-db";
import {User} from "../api/_db/models/User";
import bcrypt from "bcryptjs";

async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const encryptedPassword = bcrypt.hashSync(req.body.password, 10);

        const oldUser = await User.findOne({email: req.body.email});
        if (oldUser) {
          return res.json({error: "User Exists"});
        } else {
          res.json({status: "ok"});
        }

        const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: encryptedPassword,
        });

        await newUser.save();
        res.status(200).json(newUser);
      } catch (error) {
        res.status(500).json({error: error.message});
      }
      break;
    default:
      res.status(405).json({error: "method not allowed"});
  }
}

export default connectDB(handler);
