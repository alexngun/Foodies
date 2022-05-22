import { useEffect, useState } from 'react'
import { ConnectLocalCart, ConnectRemoteCart, calculateTotalItems, calculateSubTotal } from '../utils/fetchCart'
import { useRouter } from 'next/router'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Page from '../components/PageLayout'
import Loading from '../components/LoadingPage'
import ProductCart from '../components/ProductDisplay/ProductCart'
import CheckoutButton from '../components/Buttons/CheckoutButton'
import { useDispatch, useSelector } from 'react-redux'
import { setCart } from '../redux/cartSlicer'
import { Empty } from 'antd'
import NormalButton from '../components/Buttons/NormalButton'
import Banner from '../components/Banner'

 
function cart() {

    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cart)
    const [loading, setLoading] = useState(true);
    const [disableCheckout, setDisableCheckout] = useState(true);
    const delivery = 5.99
    
    const { push } = useRouter()
    
    useEffect(() => {
        ConnectRemoteCart("GET")
        .then( res=>{
            if(res.status === 401) {
                ConnectLocalCart()
                .then( res=>{
                    dispatch(setCart(res))
                    setLoading(false)
                }).catch( err=>setLoading(false) )
            } else {
                setDisableCheckout(false)
                dispatch(setCart(res.list))
                setLoading(false)
            }
        })

    }, [])

    const length = calculateTotalItems(cart)
    const subtotal = calculateSubTotal(cart)
    const total = subtotal + delivery

    return (
        <div>
            <Header/>
            <Page>
                <Page.SingleWindow className="mt-4"
                    component={ loading ? 
                        <Loading className='-translate-y-16'/> :
                        <div className='my-2 flex flex-col justify-center w-full h-fit items-end lg:px-16'>
                            {
                                cart.length > 0 ? 
                                <>
                                    <h1 className='w-full text-center text-[25px] font-bold text-green-700'> Cart </h1>
                                    <h2 className='w-full text-center text-[18px] text-gray-600'> {length} item(s) selected </h2>
                                    <div className='w-full lg:px-16 my-4'>
                                        { disableCheckout ? 
                                            <NormalButton className='py-2 flex justify-center w-full'
                                                onClick={()=>push("/auth/signin?callbackUrl=/cart")}
                                                bgColor='bg-gray-400'
                                            >
                                                Please Log In Before Checkout
                                            </NormalButton> : 
                                            <CheckoutButton value={`TOTAL CAD$${total.toFixed(2)} CHECK OUT`}/>
                                        }
                                    </div>

                                    {cart.map(item=>
                                        <ProductCart key={item._id} item={item}/>
                                    )}
                                    <div className='lg:mr-16 flex justify-between min-w-[300px] text-lg w-1/3 pb-5 border-b-[1px] border-b-gray-300'>
                                        <div>
                                            <div> Subtotal:</div>
                                            <div> Delivery:</div>
                                        </div>
                                        <div>
                                            <div className='text-right'>CAD${subtotal.toFixed(2)}</div>
                                            <div className='text-right'>CAD$${delivery}</div>
                                        </div>
                                    </div>
                                    <div className='lg:mr-16 w-1/3 min-w-[300px] flex justify-between font-bold text-xl mt-5'>
                                        <div> Total: </div>
                                        <div> CAD${ total.toFixed(2) } </div>
                                    </div>
                                    { disableCheckout ? 
                                            <NormalButton className='lg:mr-16 mt-5 py-2 flex justify-center w-1/3 min-w-[300px]'
                                                bgColor='bg-gray-400'
                                                onClick={()=>push("/auth/signin?callbackUrl=/cart")}
                                            >
                                                Please Log In Before Checkout
                                            </NormalButton> : 
                                            <CheckoutButton className='lg:mr-16 mt-5 w-1/3 min-w-[300px]'/>
                                    }
                                    
                                </> :
                                <div className='w-full sm:h-[650px] h-[400px]  p-10 flex items-center justify-center'>
                                    <Empty className='p-10' description={
                                        <span className='text-xl font-bold text-green-700'> 
                                            Your cart is empty 
                                        </span>
                                    }>
                                        <div className='w-full flex justify-center'>
                                            <NormalButton
                                                onClick={ ()=>push("/menu") }
                                                className='w-[200px] flex justify-center py-2'
                                            >
                                                Shop More
                                            </NormalButton>
                                        </div>
                                    </Empty>
                                </div>
                            }

                        </div>
                    }
                />
            </Page>
            <Footer/>
        </div>
    )
}


export default cart