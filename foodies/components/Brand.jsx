import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

function Brand({className}) {

  const router = useRouter()

  return (
    <div className={`${className?className:""} hover:cursor-pointer`} onClick={()=>router.push("/")}>
      <Image src="/logo.png" alt="foodies" width={95} height={23}/>
    </div>
  )
}

export default Brand