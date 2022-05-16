import React from 'react'
import MovingText from 'react-moving-text'
import InfoButton from '../Buttons/InfoButton'
import { FcLowPriority } from 'react-icons/fc'

var life = "life"
life = [...life]

var here = "here"
here = [...here]

function Greeting() {

    const space = (
        <span className='opacity-0'>l</span>
    )

  return (
    <div className='sm:pr-8'>
        <h1 className='sm:mt-14 flex flex-wrap text-[50px] text-gray-800'> 
            Your healthy
            {space}
            <div className="h-[20px] flex">
                { life.map( (letter, index) => 
                    <MovingText
                        key={`l-${index}`}
                        className="inline text-sky-700"
                        type="bounce"
                        duration="4000ms"
                        delay={`${index * 400}ms`}
                        direction="normal"
                        timing="ease-in-out"
                        iteration="infinite"
                        fillMode="none"
                    >
                        {letter}
                    </MovingText>
                )}
            </div>
            {space}
            starts
            {space}
            <div className="h-[20px] flex">
                { here.map( (letter, index) => 
                    <MovingText
                        key={`h-${index}`}
                        className="inline text-sky-700"
                        type="bounce"
                        duration="4000ms"
                        delay={`${index * 400}ms`}
                        direction="normal"
                        timing="ease-in-out"
                        iteration="infinite"
                        fillMode="none"
                    >
                        {letter}
                    </MovingText>
                )}
            </div>
            {space}
            with us!
        </h1>
        
        <p className='text-gray-700 text-[16px]'> We can help you reach your health goal with ease. Our menu is chef cooked and designed by certified nutritionists for different health goals. Order now with us and get healthy and tasty meals in no time!</p>

        <InfoButton className="mt-10" icon={<FcLowPriority className='text-[35px]'/>} des="personalize meal plans">
            Get Started
        </InfoButton>
    </div>
  )
}

export default Greeting