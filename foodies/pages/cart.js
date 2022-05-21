import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { ConnectLocalCart, ConnectRemoteCart } from '../utils/fetchCart'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Page from '../components/PageLayout'
import Loading from '../components/LoadingPage'
 
function cart() {

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        ConnectRemoteCart("GET")
        .then( res=>{
            if(res.status === 401) {
                ConnectLocalCart("GET")
                .then( res=>{
                    setCart(res)
                    setLoading(false)
                }).catch( err=>setLoading(false) )
            } else {
                setCart(res.list)
                setLoading(false)
            }
        })
    }, [])

    return (
        <div>
            <Header/>
            <Page>
                { loading ? 
                    <Page.SingleWindow className="mt-4"
                        title="Cart"
                        titleColor='text-green-700'
                        center
                        component={<Loading className='-translate-y-16'/>}
                    />:
                    <div>
                        {cart.map(item=><div key={item._id}>{item.name}</div>)}
                    </div>
                }
            </Page>
            <Footer/>
        </div>
    )
}


export default cart