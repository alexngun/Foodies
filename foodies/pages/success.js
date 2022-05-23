import React from 'react'
import { Result, Button } from 'antd'
import { useRouter } from 'next/router'
import Brand from '../components/Brand'

function success() {

    const { push } = useRouter()

    return (
    <div className='w-screen h-screen flex flex-col items-center'>
        <Brand size='lg' className="mt-[5%]"/>
        <Result
            className='-translate-y-20'
            status="success"
            title="Thank you, your order has been confirmed!"
            subTitle="We'll send a confirmation once your items has shipped. You can check the status of your order(s) by clicking the button below or continue shopping"
            extra={[
            <Button type="primary" key="orders" onClick={()=>push("/orders")}>
                Check Orders
            </Button>,
            <Button key="buy" onClick={()=>push("/menu")}>Shop More</Button>,
            ]}
        />
    </div>
    )

}

export default success