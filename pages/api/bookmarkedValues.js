import connectDB from "./_db/connect-db";
import {Bookmarked} from "./_db/models/Bookmarked";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const bookmarked = await Bookmarked.find({});
        res.status(200).json(bookmarked);
      } catch (error) {
        console.log(error);
        // You can inspect the error and return more meaningful error messages...
        res.status(500).json({error: "something went wrong"});
      }
      break;
    case "POST":
      try {
        const newBookmarked = new Bookmarked({
          id: req.body.id,
          rank: req.body.rank,
          name: req.body.name,
          price: req.body.price,
          markedCap: req.body.markedCap,
          volume: req.body.volume,
        });
        await newBookmarked.save();
        res.status(200).json(newBookmarked);
      } catch (error) {
        res.status(500).json({error: error.message});
      }
      break;

    default:
      res.status(405).json({error: "method not allowed"});
  }
}

export default connectDB(handler);
