import Header from "../components/Header"
import Footer from "../components/Footer"
import { Result, Button } from 'antd'
import Image from 'next/image'

import { useRouter } from "next/router"
import NormalButton from "../components/Buttons/NormalButton"

function NotFound() {

    const { push } = useRouter()

    return (
    <div>
        <Header/>
        <div className="min-h-[700px] flex items-center justify-center">
            <Result
                icon={
                <div className="relative">
                    <Image src="/404.svg" width={300} height={250} objectFit="cover" />
                </div>
                }
                title="Page not found"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                <div className="flex justify-center">
                    <NormalButton onClick={()=>push("/")} className="px-3 py-1" type="primary">Back to home</NormalButton>
                </div>}
            />
        </div>
        <Footer/>
    </div>
    )
}

export default NotFound