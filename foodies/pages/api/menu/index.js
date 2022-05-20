import clientPromise from "../../../utils/mongodb";

export default async function handler(req, res) {

  const client = await clientPromise;
  const db = client.db("Foodies")

  switch (req.method) {
    case "POST":
      res.status(400).send("post method not allowed at the moment")
    case "GET":
      const posts = await db.collection("Meal")
                            .find({})
                            .project({_id:1, id:1, name:1, subtitle:1, tags:1, pic:1})
                            .toArray();
      res.status(200).send( { data: posts } );
      break;
  }

}