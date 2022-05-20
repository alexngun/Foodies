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

import { signOut, useSession } from "next-auth/react"
import { closeSideMenu } from '../../redux/sideMenuSlicer'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

function Navbar() {

    const { data: session, status } = useSession()
    const { push, asPath } = useRouter()
    const dispatch = useDispatch()
    const [cart, setCart] = useState(false);

    //get cart items
    useEffect(() => {
        if ( typeof window != "undefined") {
            var temp = window.localStorage.getItem("cart")
            temp = temp ? JSON.parse(temp) : {}

            var sum = 0;
            Object.keys(temp).forEach( key => {
                sum += temp[key].qty
            })
            setCart({data: temp, length: sum})
        }
    }, [])

    const handleSignOut = async () => {
        const data = await signOut( {redirect: false, callbackUrl: '/auth/signin' } )
        push(data.url)
    }

    const MiniCart = (
        <div className='-translate-y-[4px] w-screen py-5 bg-white sm:border-t-4 sm:border-t-green-700 flex flex-col items-center justify-center border sm:w-[300px] sm:rounded-b-lg'>
            <h2 className='text-green-700 font-bold'>Shopping Cart</h2>
            { cart.length  ? 
                <ul className='w-full h-full px-5'>
                    {Object.keys(cart.data).map( (key, i) => 
                        <li key={`mini-cart-${i}`} 
                            className={`flex ${i==Object.keys(cart.data).length-1?"":"border-b-2"} py-4 hover:cursor-pointer`}
                        >
                            { console.log(cart.length) }
                            <Badge count={cart.data[key].qty}>
                                <Image objectFit='cover' className="rounded-lg" src={`/img/mealpic/${cart.data[key].pic}.jpeg`} width={80} height={70} alt={cart.data[key].name}/>
                            </Badge>
                            <span className='flex items-center w-[170px] ml-3 text-gray-500'> {cart.data[key].name} </span>
                        </li>
                    )}
                    <Link className="underline my-2 justify-center" to="/cart"> View Details </Link>
                    <CheckoutButton className="mt-2"/>
                </ul> :
                <Empty description={false}>
                    <div className="flex flex-col space-y-1">
                        <span className='text-green-900'> Cart Empty</span>
                        <Button type="primary" style={{background: "green", border: "green", marginTop: "1rem"}}>Shop Now</Button>
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
                        <Link to={`/auth/signin?callbackUrl=${asPath}`} className='flex items-center mt-1 pt-1 text-green-700'>
                            <ImEnter/>
                            <div className='ml-2'> 
                                Sign In
                            </div> 
                        </Link>
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
                    cart && 
                    <Dropdown overlay={MiniCart} trigger={['click']} placement="bottomRight">
                        <div onClick={()=>dispatch(closeSideMenu())} className="relative h-full hover:cursor-pointer flex items-center">
                            <Badge count={cart.length} overflowCount={10} className="hover:cursor-pointer">
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