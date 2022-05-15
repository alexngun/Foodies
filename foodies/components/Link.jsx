import { useRouter } from 'next/router'

function Link({className, children, to}) {

  const router = useRouter();

  return (
    <div 
        className={`w-full h-full flex items-center text-green-800 hover:cursor-pointer ${className?className:""}`}
        onClick={()=>router.push(to)}
    >
        {children}
    </div>
  )
}

export default Link