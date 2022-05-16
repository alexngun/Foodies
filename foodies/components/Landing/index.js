import React from 'react'
import AnimatedObject from './AnimatedObject'
import Image from 'next/image'
import Greeting from './Greeting'
import MovingText from 'react-moving-text'
import { fadeIn, staggerContainer, MainWrapper, MainAnimate, LeavesContainer, LeafWrapper, Leaf } from './variants'

function Landing() {
  return (
    <div className='flex w-full h-[1000px] sm:h-auto flex-col sm:flex-row overflow-hidden'>
        <div className='sm:w-2/5 h-3/5 py-10'> 
            <Greeting/> 
        </div>
        <div className='relative sm:h-[500px] sm:w-3/5 h-2/5 order-first sm:order-last '>

            {/* Text */}
            <AnimatedObject className="absolute w-full h-full flex justify-center items-center" variants={staggerContainer} initial animate>
                <AnimatedObject className="absolute" variants={fadeIn("up")}> 
                    <span className='sm:text-[150px] text-[85px] font-bold z-10'> FOODIES </span>
                </AnimatedObject>
                <AnimatedObject variants={fadeIn("up")} className="absolute top-[5%] left-[8%] -rotate-2"> 
                    <span className='text-green-700 text-xl'> Eat Fresh </span>
                </AnimatedObject>
                <AnimatedObject variants={fadeIn("up")} className="absolute top-[5%] right-[8%] rotate-3"> 
                    <span className='text-gray-600 text-xl'> 
                        <span className='font-bold text-2xl'> 2 </span> / <span> 4</span>
                    </span>
                </AnimatedObject>
                <AnimatedObject variants={fadeIn("up")} className="absolute bottom-[5%] right-[8%] -rotate-3"> 
                    <span className='text-sky-700 text-[25px] '>
                        <MovingText
                            type="typewriter"
                            dataText={[
                            'Yummy',
                            'Délicieux',
                            'うまい',
                            '好吃',
                            'lekker'
                            ]} 
                        />
                    </span>
                </AnimatedObject>
            </AnimatedObject>

            {/* Main */}
            <AnimatedObject className="absolute h-full w-full flex justify-center items-center" variants={MainWrapper} initial animate>
                <AnimatedObject variants={MainAnimate} initial animate>
                    <Image className='rotate-3 sm:scale-[100%] scale-[80%]' src="/img/web/meal.png" objectFit='contain' height={350} width={400}/>
                </AnimatedObject>
            </AnimatedObject>

            {/* Leaves */}
            <AnimatedObject className="absolute w-full h-full" variants={LeavesContainer} initial animate>
                <AnimatedObject className="absolute top-[10%] left-[10%]" variants={LeafWrapper}>
                    <AnimatedObject custom={2} variants={Leaf}>
                        <Image className='rotate-3 sm:scale-[100%] scale-[80%]' src="/img/web/leaf01.png" objectFit='contain' height={80} width={100}/>
                    </AnimatedObject>
                </AnimatedObject>
                <AnimatedObject className="absolute top-[8%] right-[8%]" variants={LeafWrapper}> 
                    <AnimatedObject custom={2.5} variants={Leaf}>
                        <Image className='-rotate-2 sm:scale-[100%] scale-[80%]' src="/img/web/leaf02.png" objectFit='contain' height={80} width={100}/>
                    </AnimatedObject>
                </AnimatedObject>
                <AnimatedObject className="absolute bottom-[7%] left-[42%]" variants={LeafWrapper}> 
                    <AnimatedObject custom={2.8} variants={Leaf}>
                        <Image className='rotate-1 sm:scale-[100%] scale-[80%]' src="/img/web/leaf03.png" objectFit='contain' height={80} width={100}/>
                    </AnimatedObject>
                </AnimatedObject>
                <AnimatedObject className="absolute bottom-[20%] right-[3%]" variants={LeafWrapper}> 
                    <AnimatedObject custom={2.1} variants={Leaf}>
                        <Image className='-rotate-3 sm:scale-[100%] scale-[80%]' src="/img/web/leaf04.png" objectFit='contain' height={80} width={100}/>
                    </AnimatedObject>
                </AnimatedObject>
                <AnimatedObject className="absolute bottom-[12%] left-[5%]" variants={LeafWrapper}> 
                    <AnimatedObject custom={3.1} variants={Leaf}>
                        <Image className='rotate-2 sm:scale-[100%] scale-[80%]' src="/img/web/leaf05.png" objectFit='contain' height={80} width={100}/>
                    </AnimatedObject>
                </AnimatedObject>
            </AnimatedObject>

        </div>
    </div>
  )
}

export default Landing