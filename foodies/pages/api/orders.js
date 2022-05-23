import clientPromise from "../../utils/mongodb"
import { getSession } from 'next-auth/react'
import { ObjectId } from "mongodb"

export default async function handler(req, res) {

  const session = await getSession({req})

  if (!session) {
    res.status(401).send( { status:401, error: "forbidden content"} )
    return
  } 

  switch (req.method) {
    case "GET":
        const client = await clientPromise;
        const db = client.db("test")
        const record = await db.collection("users").findOne({_id: ObjectId(session.userid)})

        if(record.orders) {
            res.status(200).send( {data: record.orders} )
        } else {
            res.status(200).send( {data: []} )
        }

        break;
    default:
        res.status(400).send( {status: 400, error: `${req.method} are not allowed at the moment`})
        break
  }

}