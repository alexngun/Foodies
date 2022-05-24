import { useSelector } from "react-redux";
import { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios'

import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24, color: 'white' }} spin />;
const stripePromise = loadStripe(process.env.STRIPE_KEY)

function CheckoutButton({className, value="Check Out"}) {

  const cart = useSelector(state=>state.cart)
  const [loading, setLoading] = useState(false);
  
  const createCheckoutSession = async () => {
    setLoading(true)
    const stripe = await stripePromise;
    const requestBody = {
      items: cart
    }
    
    const checkoutSession = await axios.post('/api/stripe/create-checkout-session', requestBody)
    
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })
  
    if(result.error) { alert(result.error.message) }

    setLoading(false)
  }

  return (
    <button 
      onClick={createCheckoutSession}
      className={`${className?className:""} h-[45px] w-full bg-green-700 text-white py-2 rounded-sm border-green-400 hover:opacity-90`}
    >
        { loading ? 
          <div className="flex justify-center items-center space-x-2">
            <Spin indicator={antIcon}/> 
            <div> Loading ... </div>
          </div> : 
          value}
    </button>
  )
}

export default CheckoutButton