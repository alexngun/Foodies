import Head from 'next/head'
import Back from "../../components/Back"
import Brand from "../../components/Brand"
import Image from "next/image"
import IngredientsLabel from '../../components/ProductDisplay/IngredientsLabel'
import { MiniNutrientsLabel, DetailedNutrients } from '../../components/ProductDisplay/NutrientsLabel'
import { Tag, Modal } from 'antd'
import NormalButton from '../../components/Buttons/NormalButton'
import { BsCartPlus } from 'react-icons/bs'
import QtySelector from '../../components/QtySelector'
import { IoIosArrowForward } from 'react-icons/io'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { ConnectRemoteCart } from '../../utils/fetchCart'

function Details( {data} ) {

    const [quantity, setQuantity] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const router = useRouter()

    const handleChange = value => setQuantity(value)

    const handleAddToCart = async () => {

        const id = data._id
        
            await ConnectRemoteCart("POST", {id:id, qty: quantity})
                    .then( res=> {
                        if( res.status === 401) {
                            var cart = JSON.parse(window.localStorage.getItem("cart"))
                            if(cart)
                                cart[id] = cart[id] ? { qty: cart[id].qty + quantity } : { qty: quantity }
                            else
                                cart = { [id]: { qty: quantity } }
                            window.localStorage.setItem("cart", JSON.stringify(cart))
                        }
                    })

        router.push(`/menu?add=success&item=${data.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}&qty=${quantity}`)

    }

    return (
        <div className="w-screen h-fit lg:min-h-[800px] pb-10 lg:min-w-[1200px] flex flex-col space-y-5 lg:space-y-10 items-center relative">
            <Head> <title>{data.name} - Foodies</title> </Head>
            <Brand className='lg:mt-16 mt-5'/>
            <Back/>
            <div className="lg:h-[1050px] lg:w-[1200px] lg:flex-row h-fit w-[95%] flex flex-col ">
                <div className="h-1/2 w-full lg:h-full lg:w-1/2 flex flex-col items-center">
                    <h1 className='lg:hidden lg:text-left text-center text-[22px] w-full font-bold text-green-700 mb-0'> {data.name} </h1>
                    <div className='lg:hidden lg:text-left text-center text-[16px] w-full text-gray-500 italic mb-5'>{data.subtitle}</div>
                    <div className='w-full max-w-[450px] h-[330px] relative shadow'>
                        <Image priority src={`/img/mealpic/${data.pic}.jpeg`} objectFit="cover" layout='fill' />
                    </div>
                    <IngredientsLabel ing6={data.ingredients6} ing={data.ingredientsAll}/>
                </div>
                <div className="lg:pt-0 pt-10 h-1/2 w-full lg:h-full lg:w-1/2 flex flex-col lg:pl-5 lg:items-start items-left">
                    <h1 className='hidden lg:block text-[25px] font-bold text-green-700 mb-0'> {data.name} </h1>
                    <div className='hidden lg:block text-[18px] text-gray-500 italic'>{data.subtitle}</div>
                    <p className='sm:w-[85%] w-full lg:mt-6 text-gray-500 mb-6 lg:text-left'> {data.des} </p>
                    <div className='flex space-x-2 lg:w-full w-fit mb-6'>
                        { data.tags.map( (tag, index) => <Tag color="green" key={index}>{tag}</Tag>) }
                    </div>
                    <div className='text-sky-700 lg:mb-0 font-bold text-lg'> CAD{data.price} / serving </div>
                    <div className='flex-row flex h-[120px] lg:w-3/5 w-full items-center space-x-2 pb-6'>
                        <QtySelector initial={1} onChange={handleChange} className=""/>
                        <NormalButton onClick={handleAddToCart} className='justify-center px-4 py-3 lg:py-2 text-sm font-bold w-full max-w-[200px] lg:w-fit'> 
                            <BsCartPlus className='mr-1 -translate-y-[2px]'/> Add To Cart 
                        </NormalButton>
                    </div>
                    <MiniNutrientsLabel n={data.nutrition}/>
                    <div className='flex items-center text-sky-700 mt-6 hover:cursor-pointer '>
                        <IoIosArrowForward/>
                        <div className=' underline' onClick={()=>setIsModalVisible(true)}> Nutrition Facts</div>
                    </div>

                </div>
            </div>
            <Modal
                title="Nutrition Facts" visible={isModalVisible} 
                footer = {[
                    <NormalButton
                        destroyOnClose={true}
                        forceRender={true}
                        className='px-4 py-1 text-[14px]' onClick={()=>setIsModalVisible(false)}>
                        Close
                    </NormalButton>
                ]}
            >
                <DetailedNutrients n={data.nutrition}/>
            </Modal>
        </div>
    )
}

// export const getStaticPaths = async () => {

//     const res = await fetch('http://localhost:3000/api/menu')
//     var menu = await res.json()
//     menu = Object.entries(menu)[0][1]

//     return {
//         paths: menu.map( p => { return {
//             params: {_id: p._id}
//         }}),
//         fallback: false
//     }
// }

export const getServerSideProps = async (context) => {

    const { _id } = context.query

    const res = await fetch(`${process.env.HOST}/api/menu/${_id}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });

    const { data } = await res.json()

    return {
        props: {
            data
        }
    }
}

export default Details