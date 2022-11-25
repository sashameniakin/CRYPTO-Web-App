// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// This is a demo route to demonstrate DB connectivity. Create your own routes following this scheme.

import connectDB from "./_db/connect-db";
import {Octopus} from "./_db/models/Octopus";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const octopodes = await Octopus.find({});
        res.status(200).json(octopodes);
      } catch (error) {
        console.log(error);
        // You can inspect the error and return more meaningful error messages...
        res.status(500).json({error: "something went wrong"});
      }
      break;
    case "POST":
    case "DELETE":
    case "PUT":
    case "PATCH":
    default:
      res.status(405).json({error: "method not allowed"});
  }
}

export default connectDB(handler);
