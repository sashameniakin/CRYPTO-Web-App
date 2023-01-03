import connectDB from "./_db/connect-db";
import {Diagram} from "./_db/models/Diagram";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const diagram = await Diagram.find({});
        res.status(200).json(diagram);
      } catch (error) {
        console.log(error);
        // You can inspect the error and return more meaningful error messages...
        res.status(500).json({error: "something went wrong"});
      }
      break;
    case "POST":
      try {
        const newDiagram = new Diagram({
          id: req.body.id,
          action: req.body.action,
          name: req.body.name,
          amount: req.body.amount,
          inDollars: req.body.inDollars,
        });
        await newDiagram.save();
        res.status(200).json(newDiagram);
      } catch (error) {
        res.status(500).json({error: error.message});
      }
      break;
    case "PUT":
      try {
        const diagram = await Diagram.findByIdAndUpdate(req.params.id, {
          action: req.body.action,
          amount: req.body.amount,
          inDollars: req.body.inDollars,
        });
        res.status(200).json(diagram);
      } catch (error) {
        res.status(500).json({error: error.message});
      }
      break;
    default:
      res.status(405).json({error: "method not allowed"});
  }
}

export default connectDB(handler);
