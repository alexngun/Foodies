import { useRouter } from 'next/router'

function InfoButton({icon, children, des, className}) {

  const { push } = useRouter()

  return (
    <div onClick={()=>push("/menu")} className={`bg-green-700 w-full h-full p-3 flex items-center rounded-2xl transition-opacity hover:cursor-pointer hover:opacity-90 ${className?className:""}`}>
        {icon}
        <div className='ml-3'>
            <div className='text-white text-lg uppercase'>{children}</div>
            <div className='text-gray-200'> {des} </div>
        </div>
    </div>
  )
}

export default InfoButton