import { InputNumber } from 'antd'
import { useState, useEffect } from 'react'
import { AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai'

function QtySelector( {initial, onChange, enableMore=true, className=""} ) {

    const [ more, setMore ] = useState(false)
    const [ num, setNum ] = useState(initial)

    useEffect(() => {
        if(num >= 10)
            setMore(true)

        if( num !== initial) 
            onChange(num)
    }, [num])
    

    const callbackValue = value => {
        setNum(value)
    }

    return (
        <div className={`flex items-center space-x-2 mr-5 ${className}`}>
            <label className='text-[16px] text-green-700'> Quantity </label>
            {
                more && enableMore ? 
                    <InputNumber 
                        min={1} max={999} defaultValue={initial} onChange={callbackValue}    
                    /> :
                    <div className='flex items-center space-x-1'>
                        <AiOutlineMinusSquare 
                            onClick={ ()=>{
                                num > 1 && setNum(num=>num-1)
                            }}
                            className={`select-none text-2xl ${num > 1 ? 'hover:cursor-pointer text-green-700': 'text-gray-400'}`}/>
                        <span className='text-lg'> {num} </span>
                        <AiOutlinePlusSquare
                            onClick={ ()=>setNum(num=>num+1) }
                            className='select-none text-2xl text-green-700 hover:cursor-pointer'
                        />
                     </div>
            }
        </div>
    )
}

export default QtySelector