import Image from 'next/image'
import NormalButton from '../components/Buttons/NormalButton'
import { useRouter } from 'next/router'

function Banner( {src, title, des, to, right, value="View", className=""}) {

    const router = useRouter()

  return (
    <div className={`${className} relative`}>
        {src && <Image src={src} className="absolute" layout="fill" objectFit='cover'/> }
        <div className={`z-[5] absolute ${right?'right-0':'left-0'} top-0 w-full h-full md:w-1/3`}>
            <div className={`pt-20 ${right?'pr-5':'pl-5'}`}>
                <h1 className='text-[35px] text-green-700'> {title} </h1>
                <div className='text-gray-700 text-[16px]'> {des} </div>
                { to && <NormalButton onClick={()=>router(to)} className='justify-center py-1 w-[150px] mt-4 '>{value}</NormalButton>}
            </div>
        </div>
    </div>
  )
}

export default Banner