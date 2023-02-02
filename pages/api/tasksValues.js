import connectDB from "./_db/connect-db";
import {Tasks} from "./_db/models/Tasks";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const tasks = await Tasks.find({});
        res.status(200).json(tasks);
      } catch (error) {
        console.log(error);
        res.status(500).json({error: "something went wrong"});
      }
      break;
    case "POST":
      try {
        const newTasks = new Tasks({
          title: req.body.title,
          link: req.body.link,
          blockchain: req.body.blockchain,
          deadline: req.body.deadline,
          description: req.body.description,
        });
        await newTasks.save();
        res.status(200).json(newTasks);
      } catch (error) {
        res.status(500).json({error: error.message});
      }
      break;
    default:
      res.status(405).json({error: "method not allowed"});
  }
}

export default connectDB(handler);
