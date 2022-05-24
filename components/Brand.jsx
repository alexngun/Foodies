import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

function Brand({className, size="sm"}) {

  const router = useRouter()

  return (
    <div className={`${className?className:""} hover:cursor-pointer`} onClick={()=>router.push("/")}>
      { size === "sm" ? 
        <Image priority objectFit='contain' src="/logo.png" alt="Foodies" width={120} height={23}/> :
        <Image priority quality={5} objectFit='contain' src="/logo-l.png" alt="Foodies" width={400} height={300}/>
        }
    </div>
  )
}

export default Brand