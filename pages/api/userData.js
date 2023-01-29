import connectDB from "./_db/connect-db";
import {User} from "../api/_db/models/User";
import jwt from "jsonwebtoken";

async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const {token} = req.body;
        const user = jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
          if (err) {
            return "token expired";
          }
          return res;
        });
        if (user == "token expired") {
          return res.send({status: "error", data: "token expired"});
        }
        const useremail = user.email;
        User.findOne({email: useremail})
          .then(data => {
            res.send({status: "ok", data: data});
          })
          .catch(error => {
            res.send({status: "error", data: error});
          });
      } catch (error) {
        res.status(500).json({error: error.message});
      }
      break;
    default:
      res.status(405).json({error: "method not allowed"});
  }
}

export default connectDB(handler);
