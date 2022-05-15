import Brand from '../Brand'
import BurgerMenuIcon from './BurgerMenuIcon'
import { FaUserAlt } from 'react-icons/fa'
import { Badge, Dropdown, Empty, Button } from 'antd'
import { HiShoppingBag } from 'react-icons/hi'
import Image from 'next/image'
import CheckoutButton from '../CheckoutButton'
import { IoMdSettings } from 'react-icons/io'
import { BsBox } from 'react-icons/bs'
import { ImEnter } from 'react-icons/im'

import Link from '../Link'
import { useDispatch, useSelector } from 'react-redux'
import { closeSideMenu } from '../../redux/sideMenuSlicer'

function Navbar() {

    const cart = useSelector(state=>state.cart)
    const dispatch = useDispatch()
    const cartLength = cart.length

    const MiniCart = (
        <div className='-translate-y-[4px] w-screen py-5 sm:border-t-4 flex flex-col items-center justify-center border sm:w-[300px] sm:rounded-b-lg'>
            <h2 className='text-green-700 font-bold'>Shopping Cart</h2>
            { cartLength > 0 ? 
                <ul className='w-full h-full px-5'>
                    {cart.map( (product, i) => 
                        <li key={`mini-cart-${i}`} className={`flex ${i==cartLength-1?"":"border-b-2"} py-4 hover:cursor-pointer`}>
                            <Badge count={product.qty}>
                                <Image objectFit='cover' className="rounded-lg" src={`/img/mealpic/${product.pic}`} width={80} height={70} alt={product.name}/>
                            </Badge>
                            <span className='flex items-center w-[170px] ml-3 text-gray-500'> {product.name} </span>
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
        <div className='-translate-y-[4px] w-screen text-lg sm:text-sm pt-2 sm:border-t-4 flex flex-col items-center justify-center border sm:w-[200px] sm:rounded-b-lg'>
            <ul className='w-full h-full px-5'>
                <Link to="/account" className='border-b-[1px] my-1 py-1 text-green-700'>
                    <IoMdSettings/>
                    <span className='ml-2'> Account </span>
                </Link>
                <Link to="/orders" className='flex items-center border-b-[1px] my-1 py-1 text-green-700'>
                    <BsBox/>
                    <span className='ml-2'> Orders </span>
                </Link>
                <Link to="/signin" className='flex items-center mt-1 pt-1 text-green-700'>
                    <ImEnter/>
                    <span className='ml-2'> Sign In </span>
                </Link>
            </ul>
        </div>
    )

  return (
    <header className='w-full sticky top-0 bg-slate-100 h-14'>
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
            <div className='flex space-x-3 h-full'>

                <Dropdown overlay={UserMenu} trigger={['click']}>
                    <div onClick={()=>dispatch(closeSideMenu())} className="relative h-full hover:cursor-pointer flex items-center">
                        <FaUserAlt className='text-green-700 text-xl'/>
                    </div>
                </Dropdown>

                <Dropdown overlay={MiniCart} trigger={['click']}>
                    <div onClick={()=>dispatch(closeSideMenu())} className="relative h-full hover:cursor-pointer flex items-center">
                        <Badge count={cartLength} className="hover:cursor-pointer">
                            <HiShoppingBag className='text-green-700 text-2xl'/>
                        </Badge>
                    </div>
                </Dropdown>
                
            </div>

        </div>
    </header>
  )
}

export default Navbar