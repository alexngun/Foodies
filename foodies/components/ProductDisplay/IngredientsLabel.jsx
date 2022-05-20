import{ useState } from 'react'
import Image from 'next/image'
import { Collapse } from 'antd'

function Ingredient({src, name}) {

    return (
        <div className='relative space-y-2 flex flex-col items-center justify-center'>
            <Image width={75} height={75} objectFit='cover' src={`/img/ing/${src}.jpeg`} alt={name} />
            <label className='text-sm text-gray-700'>{name.replace("_", " ").replace("_", " ")}</label>
        </div>
    )
}

function IngredientsLabel({ing6, ing}) {

  return (
    <div className='w-full max-w-[450px] min-h-[300px] flex flex-col h-fit border-[1px] border-gray-300/75'>
      <div className="text-lg font-bold pl-7 text-green-700 mt-2">Ingredients</div>
      <div className="grid grid-cols-3 grid-rows-2 w-full h-[240px] pb-2 border-b-[1px] border-b-gray-300">
        { ing6.map( (ing, index) => 
          <Ingredient key={index} name={ing} src={ing} alt={ing}/>
        )}
      </div>
      <Collapse bordered={false}>
            <Collapse.Panel header="See All Ingredients">
              <p className="text-sm text-gray-500">
                  {ing}
              </p>
            </Collapse.Panel>
      </Collapse>
    </div>
  )
}



export default IngredientsLabel