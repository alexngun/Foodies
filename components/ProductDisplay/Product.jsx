import Image from "next/image"
import { useRouter } from 'next/router'

function Product( {className="", data} ) {

  const router = useRouter()

  const handleClick = async () => {
    await router.replace('/menu', undefined, {shallow: true})
    router.push(`/menu/${data._id}`)
  }

  return (
    <div className={`${className} flex flex-col w-fit h-fit py-5 hover:cursor-pointer`} onClick={handleClick}>
        <div className="relative h-[220px] w-[320px] rounded-lg overflow-hidden"  >
            <Image quality={10} className="hover:scale-110 transition-transform" objectFit="cover" layout='fill' src={`/img/mealpic/${data.pic}.jpeg`}/>
        </div>
        <div className="mt-2">
            <div className="font-semibold">{data.name}</div>
            <div className="text-sm text-gray-500 italic">{data.subtitle ? data.subtitle : <span className="opacity-0">none</span> }</div>
        </div>
        <div className="mt-2 text-gray-600">{data.tags[0]} | {data.tags[1]}</div>
    </div>
  )
}

export default Product