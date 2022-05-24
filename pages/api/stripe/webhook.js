import clientPromise from "../../../utils/mongodb"
import { getSession } from 'next-auth/react'
import { ObjectId } from "mongodb"
import { buffer } from 'micro'

const stripe = require('stripe')(process.env.STRIPE_SECRET)
const endpointSecret = process.env.STRIPE_SIGNING_SECRET

const fulfillOrder = async session => {

    const client = await clientPromise;
    const db = client.db("test")

    const today = new Date().getTime()
    var next2Days = new Date()
    next2Days.setDate(next2Days.getDate() + 2)
    next2Days = next2Days.getTime()

    const id = ObjectId(session.metadata.user)
    delete session.metadata.user

    var items = []
    Object.keys(session.metadata).forEach( key => {
        const order = JSON.parse(session.metadata[key])
        items.push( {
            itemId: ObjectId(key), 
            name: order.name, 
            subtitle: order.subtitle, 
            qty: order.qty,
            pic: order.pic,
            price: order.price
        } )
    })

    const orderDetails = {
        _id: session.id,
        customer: session.customer_details,
        amount: session.amount_total,
        dateoforder: today,
        dateofdeliver: next2Days,
        items: items,
        status: 'pending'
    }

    await db.collection('users').updateOne(
        {_id: id},
        {$push: { orders: orderDetails }, $set: { cart: [] } }
    )
}

export default async function handler(req, res) {

    if(req.method === 'POST') {
        const requestBuffer = await buffer(req)
        const payload = requestBuffer.toString()
        const sig = req.headers["stripe-signature"]

        let event

        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            console.log('ERROR', err.message)
            return res.status(400).send({error: err.message})
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object
            return fulfillOrder(session)
                   .then(()=>res.status(200))
                   .catch(err=>res.status(400).send({error: err}))
        }
    } else {
        res.status(400).send( {status: 400, error: `${req.method} are not allowed at the moment`})
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}