import Brand from "../Brand"
import Link from "../Link"
import Image from "next/image"
import { BsFacebook, BsInstagram, BsTwitter, BsSnapchat } from 'react-icons/bs'

function Footer() {
  return (
    <footer className='w-full bg-white border-t-gray-400/30 mt-16 border-t-[1px] lg:h-[380px] h-fit min-h-[380px] pt-16'>
        <div className='mx-auto max-w-[1000px] w-full h-full grid lg:grid-cols-4 lg:grid-rows-1 sm:grid-cols-2 sm:grid-rows-2'>
            <div className="mx-auto my-8">
                <Brand/>
                <div className="mt-2 font-semibold text-gray-500"> © Foodies Inc. </div>
            </div>
            <ul className="space-y-2 mx-auto my-8">
                <h1 className="text-green-700 font-bold text-xl"> Company </h1>
                <li> <Link className="text-gray-500">Careers</Link> </li>
                <li> <Link className="text-gray-500">Contact</Link> </li>
                <li> <Link className="text-gray-500">Terms</Link> </li>
                <li> <Link className="text-gray-500">Privacy</Link> </li>
                <li> <Link className="text-gray-500">Partnerships</Link> </li>
                <li> <Link className="text-gray-500">Affiliates</Link> </li>
            </ul>
            <ul className="space-y-2 mx-auto my-8">
                <h1 className="text-green-700 font-bold text-xl"> Learn more </h1>
                <li> <Link className="text-gray-500">Plans & Menu</Link> </li>
                <li> <Link className="text-gray-500">Why Foodies</Link> </li>
                <li> <Link className="text-gray-500">Blog</Link> </li>
                <li> <Link className="text-gray-500">FAQs</Link> </li>
                <li> <Link className="text-gray-500">Students</Link> </li>
            </ul>
            <div className="space-y-2 mx-auto my-8">
                <h1 className="text-green-700 font-bold text-xl"> Follow us </h1>
                <div className="flex items-center justify-between w-[120px] text-gray-500 text-xl">
                    <BsFacebook className="hover:cursor-pointer"/>
                    <BsInstagram className="hover:cursor-pointer"/>
                    <BsTwitter className="hover:cursor-pointer"/>
                    <BsSnapchat className="hover:cursor-pointer"/>
                </div>
                <div className="relative flex flex-col h-[100px] justify-around">
                    <Image className="hover:cursor-pointer" src="/img/web/appstore.svg" width={120} height={40} />
                    <Image className="hover:cursor-pointer" src="/img/web/googleplay.png" width={120} height={40} />
                </div>

            </div>
        </div>
    </footer>
  )
}

export default Footer