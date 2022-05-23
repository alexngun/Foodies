import Header from '../components/Header'
import Footer from '../components/Footer'
import LoadingPage from '../components/LoadingPage'
import Page from '../components/PageLayout'
import OrderBox from '../components/ProductDisplay/OrderBox'

import { getSession } from 'next-auth/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Empty, Pagination } from 'antd'

const itemsPerPage = 6

const OrderItems = ( {items} ) => {

    var orders = []
    items.data.forEach(element => {
        orders.unshift(element)
    })

    const [currentPage, setCurrentPage] = useState(1);
    const handleChangePage = page => setCurrentPage(page)

    return (
        <Page>
            <Page.SingleWindow
                className="flex flex-col items-center"
                title="Order History"
                titleColor='text-green-700'
                center
                component={
                    items.data.length > 0 ?
                        <>
                            <div className='text-lg '> {items.data.length} order(s) found </div>
                            {orders.slice(itemsPerPage*(currentPage-1), itemsPerPage*(currentPage)).map( (item, index) => 
                                <OrderBox key={index} item={item}/>
                            )}
                            <Pagination onChange={handleChangePage} defaultCurrent={1} pageSize={itemsPerPage} total={items.data.length}/>
                        </> :
                        <div className='flex flex-col items-center justify-center h-[400px]'>
                            <Empty description={<span>You do not have any order history.</span>}>
                                <span className='text-gray-400'> If you believe there is some mistake on your order history, please contact us (123)456-7890.</span>
                            </Empty>
                        </div>

                }
            />
        </Page>
    )
}

function orders({session}) {

    const [orders, setOrders] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        await axios.get("/api/orders")
                    .then( res=> {
                        setOrders(res.data)
                    })
        setLoading(false)
    }
    
    useEffect(() => {
      fetchOrders()
    }, [])

    return (
    <div>
        <Header/>
            {loading ? 
                <LoadingPage/> : 
                <OrderItems items={orders}/>
            }
        <Footer/>
    </div>
    )
}

export async function getServerSideProps(context) {

    const session = await getSession(context)

    if(!session) {
        return {
            redirect: {
                destination: "/auth/signin?callbackUrl=/orders&error=AuthRequired",
                permanent: false,
            }
        }
    }

    return {
        props: { session: session }
    }
}



export default orders