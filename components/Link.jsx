import { useRouter } from 'next/router'

function Link({className, children, color="text-green-700", to="/"}) {

  const router = useRouter();

  return (
    <div 
        className={`w-full h-full flex items-center ${color} hover:cursor-pointer ${className?className:""}`}
        onClick={()=>router.push(to)}
    >
        {children}
    </div>
  )
}

export default Link