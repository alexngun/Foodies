import React from 'react'
import Image from 'next/image'

function ProductCards() {
  return (
    <div className='relative h-[350px] w-[240px] scale-[70%] lg:scale-100'>
        <div className='rotate-[60deg] rounded-2xl shadow-lg translate-x-[40px] translate-y-5 h-full w-full absolute'>
            <Image quality={40} className='rounded-2xl z-[1] transform-gpu' priority objectFit='cover' src="/img/mealpic/cajun_bowl.jpeg" layout='fill'/>
        </div>
        <div className='rotate-[20deg] rounded-2xl shadow-lg translate-x-[10px] -translate-y-5 h-full w-full absolute'>
            <Image quality={40} className='rounded-2xl z-[2] transform-gpu' priority objectFit='cover' src="/img/mealpic/baja_stew.jpeg" layout='fill'/>
        </div>
        <div className='rotate-[-20deg] rounded-2xl shadow-lg translate-x-[-10px] -translate-y-5 h-full w-full absolute'>
            <Image quality={40} className='rounded-2xl z-[3] transform-gpu' priority objectFit='cover' src="/img/mealpic/chicken_parm.jpeg" layout='fill'/>
        </div>
        <div className='rotate-[-60deg] rounded-2xl shadow-lg translate-x-[-40px] translate-y-5  h-full w-full absolute'>
            <Image quality={40} className='rounded-2xl z-[4] transform-gpu' priority objectFit='cover' src="/img/mealpic/fish_cake.jpeg" layout='fill'/>
        </div>
    </div>
  )
}

export default ProductCards