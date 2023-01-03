import connectDB from "../_db/connect-db";
import {Tasks} from "../_db/models/Tasks";

async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      try {
        Tasks.findByIdAndDelete(req.query.taskId, function (err) {
          if (err) console.log(err);
          console.log("Successful deletion");
        });
        return res.status(200).end();
      } catch (error) {
        return res.status(500).json({error: error.message});
      }
    default:
      return res.status(400).json({error: "method not supported"});
  }
}

export default connectDB(handler);
