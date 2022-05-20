import clientPromise from "../../../utils/mongodb";
import { ObjectId } from "mongodb";
import validateObjectId from "../../../utils/validateId";

export default async function handler(req, res) {

  const client = await clientPromise;
  const db = client.db("Foodies")

  switch (req.method) {
    case "POST":
        res.status(400).send({error: "post method not allowed at the moment"})
    case "GET":
        const posts = validateObjectId(req.query.id) ?
                      //if objectid is valid, fetch from database
                      await db.collection("Meal").findOne({_id: ObjectId(req.query.id) }) :  
                      //else return 400 with invalid id    
                      res.status(400).send( {error: "invalid object id"} )

        // return not found error or target data
        posts ? res.status(200).send( { data: posts } ) : res.status(400).send( {error: "target not found"} )

  }

}