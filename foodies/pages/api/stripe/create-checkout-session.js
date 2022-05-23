import clientPromise from "../../../utils/mongodb";
import { getSession } from 'next-auth/react'
const stripe = require('stripe')(process.env.STRIPE_SECRET)

export default async function handler(req, res) {

    const session = await getSession({req})

    if (!session) {
      res.status(401).send( { status:401, error: "forbidden content"} )
      return
    }

    switch (req.method) {
      case "POST":
        const { items } = req.body

        const transformedItem = items.map( item => ({
          description: item.subtitle,
          quantity: item.qty,
          price_data: {
            currency: 'cad',
            unit_amount: item.price * 100,
            product_data: {
              name: item.name,
            }
          }
        }))

        var trimedItems = {}

        items.forEach( item => (
          trimedItems[item._id] = JSON.stringify({
            name: item.name,
            subtitle: item.subtitle,
            qty: item.qty,
            pic: item.pic,
            price: item.price
          })
        ))

        const checkoutSession = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          shipping_rates: ['shr_1Kvtb1EUrvKU5Z31KgFKdr9y'],
          line_items: transformedItem,
          shipping_address_collection: {
            allowed_countries: ['US', 'CA']
          },
          mode: 'payment',
          success_url: `${process.env.HOST}/success`,
          cancel_url: `${process.env.HOST}/cart`,
          metadata: {
            user: session.userid,
            ...trimedItems
          }
        })
        res.status(200).json({ id: checkoutSession.id })
        break
      default:
        res.status(400).send( {status: 400, error: `${req.method} are not allowed at the moment`})
        break
    }
}