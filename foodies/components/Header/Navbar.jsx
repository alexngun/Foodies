import Brand from '../Brand'
import BurgerMenuIcon from './BurgerMenuIcon'
import { FaUserAlt } from 'react-icons/fa'
import { Badge, Dropdown, Empty, Button } from 'antd'
import { HiShoppingBag } from 'react-icons/hi'
import Image from 'next/image'
import CheckoutButton from '../Buttons/CheckoutButton'
import { IoMdSettings } from 'react-icons/io'
import { BsBox } from 'react-icons/bs'
import { ImEnter } from 'react-icons/im'
import Link from '../Link'
import NormalButton from '../Buttons/NormalButton'

import { signOut, useSession } from "next-auth/react"
import { closeSideMenu } from '../../redux/sideMenuSlicer'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ConnectRemoteCart, ConnectLocalCart, calculateTotalItems } from '../../utils/fetchCart'
import { setCart } from '../../redux/cartSlicer'

function Navbar() {

    const { data: session, status } = useSession()
    const { push, pathname, replace } = useRouter()
    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cart)
    const [loading, setLoading] = useState(true);
    const [disableCheckout, setDisableCheckout] = useState(true);
    
    //get cart items
    useEffect(() => {
        ConnectRemoteCart("GET")
        .then( res=>{
            if(res.status === 401) {
                ConnectLocalCart()
                .then( res=>{
                    dispatch(setCart(res))
                    setLoading(false)
                })
            } else {
                dispatch(setCart(res.list))
                setLoading(false)
                setDisableCheckout(false)
            }
        })
    }, [])
    
    const length = calculateTotalItems(cart)

    const handleSignIn = async () => {
        await replace(pathname, undefined, {shallow: true})
        push('/auth/signin')
    }

    const handleSignOut = async () => {
        const data = await signOut( {redirect: false, callbackUrl: '/auth/signin' } )
        push(data.url)
    }

    const MiniCart = (
        <div className='-translate-y-[4px] w-screen py-5 bg-white sm:border-t-4 sm:border-t-green-700 flex flex-col items-center justify-center border sm:w-[300px] sm:rounded-b-lg'>
            <h2 className='text-green-700 font-bold'>Shopping Cart</h2>
            { cart.length  ? 
                <ul className='w-full h-full px-5'>
                    {cart.slice(0,5).map( (item, i) => 
                        <li key={`mini-cart-${i}`} 
                            className={`flex ${i==4 || i==cart.length-1?"":"border-b-2"} py-4 hover:cursor-pointer`}
                            onClick={()=>push(`/menu/${item._id}`)}
                        >
                            <Badge count={item.qty} overflowCount={10}>
                                <Image objectFit='cover' className="rounded-lg" src={`/img/mealpic/${item.pic}.jpeg`}
                                    width={80} height={70} alt={item.name}
                                />
                            </Badge>
                            <span className='flex items-center w-[170px] ml-3 text-gray-500'> {item.name} </span>
                        </li>
                    )}
                    {cart.length>5 && <div className='flex justify-center text-gray-500 text-sm'> Click below to check more your items </div>}
                    <Link className="underline my-2 justify-center" to="/cart"> View Details </Link>
                    { disableCheckout ? 
                        <NormalButton className='py-2 flex justify-center w-full'
                            onClick={()=>push("/auth/signin?callbackUrl=/cart")}
                            bgColor='bg-gray-400'
                        >
                            Please Log In First
                        </NormalButton> : 
                        <CheckoutButton value="CHECK OUT" />
                    }
                </ul> :
                <Empty description={false}>
                    <div className="flex flex-col space-y-1">
                        <span className='text-green-900'> Cart Empty</span>
                        <Button onClick={()=>push("/menu")} type="primary" style={{background: "green", border: "green", marginTop: "1rem"}}>Shop Now</Button>
                    </div>
                </Empty>
            }
        </div>
    );

    const UserMenu = (
        <div className='-translate-y-[4px] w-screen text-lg bg-white sm:text-sm pt-2 sm:border-t-4 sm:border-t-green-700 sm:w-[200px] flex flex-col items-center justify-center border sm:rounded-b-lg'>
            <ul className='w-full h-full px-5'>
                <Link to="/account" className='border-b-[1px] my-1 py-1 text-green-700'>
                    <IoMdSettings/>
                    <span className='ml-2'> Account </span>
                </Link>
                <Link to="/orders" className='flex items-center border-b-[1px] my-1 py-1 text-green-700'>
                    <BsBox/>
                    <span className='ml-2'> Orders </span>
                </Link>
                {
                    status === "authenticated" ? 
                        <div onClick={handleSignOut} className='flex items-center mt-1 pt-1 text-green-700 hover:cursor-pointer'>
                            <ImEnter/>
                            <div className='ml-2 flex flex-col flex-wrap' onClick={handleSignOut}>
                                <span> Sign Out </span>
                                <span className='text-sm'>({session.user.name})</span>
                            </div> 
                        </div> :
                        <div onClick={handleSignIn} className='hover:cursor-pointer flex items-center mt-1 pt-1 text-green-700'>
                            <ImEnter/>
                            <div className='ml-2'> 
                                Sign In
                            </div> 
                        </div>
                }
            </ul>
        </div>
    )

  return (
    <header className='w-full sticky top-0 h-14 z-10 bg-white'>
        <div className='max-w-[1200px] w-full h-full mx-auto px-4 flex items-center justify-between'>
            <BurgerMenuIcon className="block sm:hidden"/>
            <Brand/>
            <ul className='h-full items-center m-0 hidden sm:flex'>
                <li className='w-20 h-full'>
                    <Link className="justify-center" to='/about'>About</Link>
                </li>
                <li className='w-20 h-full'>
                    <Link className="justify-center" to='/menu'>Menu</Link>
                </li>
                <li className='w-20 h-full'>
                    <Link className="justify-center" to='/plans'>Plans</Link>
                </li>
                <li className='w-20 h-full'>
                    <Link className="justify-center" to='/recipe'>Recipe</Link>
                </li>
                <li className='w-20 h-full'>
                    <Link className="justify-center" to='/help'>Help</Link>
                </li>
            </ul>
            <div className='flex space-x-3 h-full mr-2'>

                <Dropdown overlay={UserMenu} trigger={['click']} placement="bottomRight">
                    <div onClick={()=>dispatch(closeSideMenu())} className="relative h-full hover:cursor-pointer flex items-center">
                        <FaUserAlt className='text-green-700 text-xl'/>
                    </div>
                </Dropdown>

                {
                    loading ? <div className='relative h-full flex items-center'><HiShoppingBag className='text-gray-400 text-2xl'/></div> :
                        cart && 
                        <Dropdown destroyPopupOnHide overlay={MiniCart} trigger={['click']} placement="bottomRight">
                            <div onClick={()=>dispatch(closeSideMenu())} className="relative h-full hover:cursor-pointer flex items-center">
                                <Badge count={length} overflowCount={99} className="hover:cursor-pointer">
                                    <HiShoppingBag className='text-green-700 text-2xl'/>
                                </Badge>
                            </div>
                        </Dropdown>
                }

            </div>

        </div>
    </header>
  )
}

export default Navbar