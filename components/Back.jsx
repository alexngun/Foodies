import { useRouter } from 'next/router'
import { IoIosArrowBack } from 'react-icons/io'

function Back( { className="" }) {

    const router = useRouter()

    return (
        <div className={`${className} flex text-lg items-center space-x-1 hover:cursor-pointer hover:scale-110 transition-transform text-green-700`}
            onClick={ () => router.back() }
        >
            <IoIosArrowBack/>
            <span className=''> Back </span>
        </div>
    )
}

export default Back