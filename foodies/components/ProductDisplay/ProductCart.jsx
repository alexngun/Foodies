import Image from 'next/image'
import { Tag, Spin } from 'antd'
import QtySelector from '../QtySelector'

import truncateText from '../../utils/truncateText'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { ConnectRemoteCart } from '../../utils/fetchCart'
import { deleteItem, modifyCart } from '../../redux/cartSlicer'
import { useState } from 'react'

const colors = {
    "High Protein":'magenta',
    "Spicy": 'red',
    "Gluten Free": 'gold',
    "Vegetarian": 'green',
    "Soy Free":'cyan',
    "Dairy Free": 'geekblue',
}

function ProductCart( {item, className=""} ) {

    const { push } = useRouter()
    const dispatch = useDispatch()
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [qtyLoading, setQtyLoading] = useState(false);
    
    const handleDelete = async () => {
        setDeleteLoading(true)
        await ConnectRemoteCart("DELETE", {id: item._id})
                .then( res=> {
                    if(res.status === 401) {
                        var cart = JSON.parse(window.localStorage.getItem("cart"))
                        delete cart[item._id]
                        window.localStorage.setItem( "cart", JSON.stringify(cart) )
                    }
                    dispatch(deleteItem({id: item._id}))
                })
        setDeleteLoading(false)
    }

    const handleChange = async qty => {
        setQtyLoading(true)
        await ConnectRemoteCart("PUT", {id: item._id, qty: qty})
                .then( res=> {
                    if(res.status === 401) {
                        var cart = JSON.parse(window.localStorage.getItem("cart"))
                        cart[item._id] = {qty: qty}
                        window.localStorage.setItem( "cart", JSON.stringify(cart) )
                    }
                    dispatch(modifyCart({id: item._id, qty: qty})) 
                })
        setQtyLoading(false)
    }

    return (
    <div className={`border-b-[1px] border-b-gray-300 mb-10 justify-center flex flex-col lg:flex-row lg:h-[300px] h-fit py-5 lg:px-2 w-full ${className}`}>
        <div onClick={()=>push(`/menu/${item._id}`)} 
            className='hover:cursor-pointer grow-0 relative pl-16 lg:w-[300px] w-full lg:h-full h-[300px]'
            >
            <Image className='rounded-lg' src={`/img/mealpic/${item.pic}.jpeg`} layout="fill" objectFit='cover'/>
        </div>
        <div className='h-full w-fit lg:px-10 flex flex-col'>
            <div className='text-[22px] text-green-700'>{item.name}</div>
            <div className='text-[16px] text-gray-500 italic'>{item.subtitle}</div>
            <div className='flex lg:w-full w-fit mt-2'>
                { item.tags.map( (tag, index) => <Tag color={colors[tag]} key={index}>{tag}</Tag>) }
            </div>
            <p className='sm:w-[400px] w-full mt-2'> {truncateText(item.des, 200)} </p>
            { deleteLoading ? 
                <div> <Spin/> </div>  :
                <div onClick={handleDelete} className='underline text-red-600 transition-all hover:cursor-pointer'> Delete </div>
            }
        </div>
        <div className='flex flex-col lg:justify-start justify-between mt-2'>
            <div className='text-green-700 font-bold text-xl'>CAD${(item.price * item.qty).toFixed(2)}</div>
            <div className='flex flex-col h-[40px] justify-center w-[160px]'>
                { qtyLoading ? 
                    <div className='flex justify-center w-full'> <Spin/> </div> : 
                    <QtySelector enableMore={false} initial={item.qty} onChange={(v)=>handleChange(v)}/> 
                }
            </div>
            <div className='mt-5 text-sky-700'> CAD${item.price} / serving </div>
        </div>
    </div>
    )
}

export default ProductCart