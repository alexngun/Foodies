import clientPromise from "../../../utils/mongodb";

export default async function handler(req, res) {

  const client = await clientPromise;
  const db = client.db("test")

  switch (req.method) {
    case "GET":
      const posts = await db.collection("meal")
                            .find({})
                            .project({_id:1, id:1, name:1, subtitle:1, tags:1, pic:1})
                            .toArray();
      res.status(200).send( { data: posts } );
      break;
    default:
      res.status(400).send( {status: 400, error: `${req.method} are not allowed at the moment`})
      break
  }

}