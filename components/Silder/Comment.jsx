import Image from 'next/image'

function Comment( {comment} ) {
    return (
        <div className='h-full flex flex-col items-center justify-around py-4 px-12 text-center'>
            <Image quality={30} objectFit='cover' className='rounded-full' src={`/img/avatars/${comment.avatar}`} width={70} height={70}/>
            <div className='text-yellow-500 text-[28px]'> ★★★★★ </div>
            <div className='font-bold text-xl text-green-700'> {comment.title} </div>
            <p className='py-2'> {comment.des} </p>
           <div className='font-bold text-lg text-gray-700'> {comment.name} </div>
        </div>
    )
}

export default Comment