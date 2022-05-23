import { Tooltip, Badge } from 'antd'
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'
import Image from 'next/image'
import NormalButton from '../Buttons/NormalButton'
import { useState } from 'react'
import { useRouter } from 'next/router'

function OrderBox( {item, cap=3} ) {

    const address = item.customer.address
    const dateoforder = new Date(item.dateoforder).toDateString()
    const dateofdeliver = new Date(item.dateofdeliver).toDateString()
    const { push } = useRouter()
    const [more, setMore] = useState(false);

    const handleCheckDetails = id => push(`/menu/${id}`)

    return (
    <div className='flex flex-col max-w-[800px] w-full h-fit border-[1px] rounded-lg border-gray-300 my-5'>
        <div className='bg-gray-100 h-[60px] w-full flex items-center justify-between px-4 py-2 rounded-t-lg'>
            <div className='flex items-center space-x-4'>
                <div className='flex flex-col text-gray-600'>
                    <span className='text-[11px]'> ORDER PLACED </span>
                    <span className='text-xs'> {dateoforder} </span>
                </div>
                <div className='flex flex-col text-gray-600'>
                    <span className='text-[11px]'> TOTAL </span>
                    <span className='text-xs'> CAD${item.amount/100}</span>
                </div>
                <div className='flex flex-col text-gray-600'>
                    <span className='text-[11px]'> Ship To </span>
                    <Tooltip placement="topLeft" title={<span className='text-xs'> {address.line1} {address.line2} {address.city} {address.country} {address.postal_code} </span>}>
                        <span className='hover:cursor-pointer text-sky-800 underline flex items-center'>
                            <span className='text-xs'>{item.customer.name}</span>
                            <MdKeyboardArrowUp/>
                        </span>
                    </Tooltip>
                </div>
            </div>
            <div className='flex-col text-xs text-gray-600 sm:flex hidden'>
                <span> ORDER # {item._id.slice(11, 30)} </span>
            </div>
        </div>
        <Badge.Ribbon color="gold" text={`${item.status==="pending"?"Not Shipped":item.status.charAt(0).toUpperCase() + item.status.slice(1) }`}>
            <div className='p-4'>
                <div className='text-[15px] text-green-700 font-bold mt-5 sm:mt-0'>Estimated Deliver Date: {dateofdeliver}</div>
                <div className='flex sm:flex-row flex-col'>
                    <div className='sm:w-[75%] w-full flex flex-col space-y-5 mt-4'>
                        {item.items.slice(0,cap).map( p=>
                            <div key={p.itemId} className='flex'>
                                <div className='relative sm:w-[150px] sm:h-[120px] w-[60px] h-[75px] hover:cursor-pointer' onClick={()=>handleCheckDetails(p.itemId)}>
                                    <Image className='rounded-sm' src={`/img/mealpic/${p.pic}.jpeg`} objectFit="cover" layout="fill"/>
                                </div>
                                <div className='flex flex-col pl-5 w-[260px]'>
                                    <div className='font-bold hover:cursor-pointer' onClick={()=>handleCheckDetails(p.itemId)}> {p.name} x {p.qty} </div>
                                    <div className='text-xs italic text-gray-600'> {p.subtitle} </div>
                                    <div className='mt-2 text-sm'> CAD${p.price} / serving </div>
                                    <NormalButton className='mt-2 w-fit px-2 py-1' onClick={()=>handleCheckDetails(p.itemId)}>Buy it again</NormalButton>
                                </div>
                            </div>
                        )}
                        { item.items.length > cap && !more &&
                            <div className='hover:cursor-pointer font-bold underline pl-1 flex items-center space-x-2'
                                onClick={()=>setMore(true)}
                            >
                                Show More <MdKeyboardArrowDown/> 
                            </div>
                        }
                        {
                            more && 
                            item.items.slice(cap).map( p=>
                                <div key={p.itemId+item._id} className='flex'>
                                    <div className='relative sm:w-[150px] sm:h-[120px] w-[60px] h-[75px] hover:cursor-pointer' onClick={()=>handleCheckDetails(p.itemId)}>
                                        <Image className='rounded-sm' src={`/img/mealpic/${p.pic}.jpeg`} objectFit="cover" layout="fill"/>
                                    </div>
                                    <div className='flex flex-col pl-5 w-[260px]'>
                                        <div className='font-bold hovre:cursor-pointer' onClick={()=>handleCheckDetails(p.itemId)}> {p.name} x {p.qty} </div>
                                        <div className='text-xs italic text-gray-600'> {p.subtitle} </div>
                                        <div className='mt-2 text-sm'> CAD${p.price} / serving </div>
                                        <NormalButton className='mt-2 w-fit px-2 py-1'>Buy it again</NormalButton>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className='sm:w-[25%] w-full flex flex-col space-y-3 pt-5'>
                        { item.status === "pending" &&
                            <>
                                <NormalButton className='w-full px-2 py-1 flex justify-center'> Change Shippment </NormalButton>
                                <NormalButton className='w-full px-2 py-1 flex justify-center' bgColor='bg-gray-400'> Cancel Order </NormalButton>
                            </>
                        }
    
                        <NormalButton className='w-full px-2 py-1 flex justify-center' bgColor='bg-gray-400'> Write a feedback </NormalButton>
                    </div>
                </div>
            </div>
        </Badge.Ribbon>

    </div>
    )
}

export default OrderBox