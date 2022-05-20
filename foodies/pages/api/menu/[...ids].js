import clientPromise from "../../../utils/mongodb";
import { ObjectId } from "mongodb";
import validateObjectId from "../../../utils/validateId";

export default async function handler(req, res) {

  const client = await clientPromise;
  const db = client.db("test")

  switch (req.method) {
    case "GET":
        const posts = await db.collection("meal").find(
            {_id: { $in : req.query.ids.map(id=>ObjectId(id))} }
        ).toArray()

        // return not found error or target data
        posts ? res.status(200).send( posts ) : res.status(400).send( {error: "target not found"} )
        break
    default:
        res.status(400).send({error: `${req.method} method not allowed at the moment`})
  }

}