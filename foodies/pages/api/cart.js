import clientPromise from "../../utils/mongodb";
import { getSession } from 'next-auth/react'
import validateObjectId from '../../utils/validateId'
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

  const session = await getSession({req})

  if (!session) {
    res.status(401).send( { status:401, error: "forbidden content"} )
    return
  } 

  const client = await clientPromise;
  const db = client.db("test")

  switch (req.method) {
    case "POST":
      const postResult = validateObjectId(session.userid) ?
                      await db.collection("users").updateOne(
                        {_id: ObjectId(session.userid)},
                        {$push: { cart : 
                          { itemID: ObjectId(req.body.id), qty:req.body.qty} 
                        }}
                      ) :
                      res.status(400).send( {error: "invalid object id"} )
      res.status(200).send({status: 200, res: postResult})
      break
    case "DELETE":
      const deleteResult = validateObjectId(session.userid) ?
                      await db.collection("users").updateOne(
                        {_id: ObjectId(session.userid)},
                        {$pull: { cart : 
                          { itemID: ObjectId(req.body.id) } 
                        }}
                      ) :
                      res.status(400).send( {error: "invalid object id"} )
      res.status(200).send({status: 200, res: deleteResult})
      break
    case "PUT":
      const putResult = validateObjectId(session.userid) ?
                      await db.collection("users").updateOne(
                        {_id: ObjectId(session.userid), "cart.itemID": ObjectId(req.body.id) },
                        {$set: { "cart.$.qty" : req.body.qty} }
                      ) :
                      res.status(400).send( {error: "invalid object id"} )
      res.status(200).send({status: 200, res: putResult})
      break
    case "GET":
      const result = await db.collection("users").aggregate( [
                              {$match: { "_id" : ObjectId(session.userid)} },
                              {$lookup: {
                                from: "meal",
                                localField: "cart.itemID",
                                foreignField: "_id",
                                as: "list"
                              }},
                              {$project: {list: 1, _id: 0} }
                            ]).toArray()
                      
      result ? res.status(200).send( result[0] ) : res.status(400).send( {error: "target not found"} )
      break
    default:
      res.status(400).send( {status: 400, error: `${req.method} are not allowed at the moment`})
      break
  }


}