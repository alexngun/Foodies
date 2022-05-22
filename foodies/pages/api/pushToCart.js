import clientPromise from "../../utils/mongodb"
import { getSession } from 'next-auth/react'
import { ObjectId } from "mongodb"

export default async function handler(req, res) {

  const client = await clientPromise;
  const db = client.db("test")

  const session = await getSession({req})

  if (!session) {
    res.status(401).send( { status:401, error: "forbidden content"} )
    return
  } 

  switch (req.method) {
    case "POST":
        const posts = await db.collection("users")
                            .findOne({_id: ObjectId(session.userid)})

        var cart = []
        const body = JSON.parse(req.body)

        if( posts.cart) {
            cart = posts.cart
            const length = cart.length

            if( length > 0 ) 
                Object.keys(body).forEach( key=> {
                    var isAppended = true
                    for( var i = 0; i < length; i++) {
                        if( key === cart[i].itemID.toString() ) {
                            cart[i].qty += body[key].qty
                            isAppended = false
                            break
                        }
                    }
 
                    if(isAppended)
                        cart.push({itemID: ObjectId(key), qty: body[key].qty})
                })
            else
                Object.keys(req.bod).forEach( key=> {
                    cart = [...cart, {itemID: ObjectId(key), qty: body[key].qty}]
                })


        } else {
            Object.keys(body).forEach( key=> {
                cart.push( {itemID: ObjectId(key), qty: body[key].qty} )
            })
        }

        await db.collection("users")
                .updateOne( 
                    {_id: ObjectId(session.userid)},
                    { $set: { cart: cart } }
                )

        res.status(200).send( { status: "ok" } );
        break;
    default:
        res.status(400).send( {status: 400, error: `${req.method} are not allowed at the moment`})
        break
  }

}