import Header from "../../components/Header"
import Page from '../../components/PageLayout'
import Footer from '../../components/Footer'
import { Select } from 'antd'
import Product from "../../components/ProductDisplay/Product"
import Image from "next/image"
import Head from 'next/head'
import Banner from "../../components/Banner"
import { motion, AnimatePresence } from 'framer-motion'
import { Alert } from 'antd'

import { getMonth } from '../../utils/date'
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

const sortMenu = (menu, category) => {
    
    menu = Object.entries(menu)[0][1]
    switch(category) {
        case "all":
            return menu;
        case "protein":
            return menu.filter( meal => meal.id.substring(0,2) === 'PR')
        case "veggie":
            return menu.filter( meal => meal.id.substring(0,2) === "VG")
        case "diet":
            return menu.filter( meal => meal.id.substring(0,2) === "DI")
        case "snacks":
            return menu.filter( meal => meal.id.substring(0,2) === "SK")
    }

}

function index( {menu} ) {

    let month = getMonth("string")
    const [category, setCategory] = useState("all");
    const { query, replace } = useRouter()
    const [showSuccess, setshowSuccess] = useState(false);
    const cart = useSelector(state=>state.cart)
    
    useEffect(() => {
        query.add && setshowSuccess(true)
    }, [cart])
    
    setTimeout( ()=> {
        showSuccess && setshowSuccess(false)
        showSuccess && replace('/menu', undefined, {shallow: true})
    }, 5000 )

    return (
    <div className="flex flex-col items-center">
        <Head>
            <title> Menu-Foodies </title>
        </Head>
        <Header/>
        <AnimatePresence>
            { showSuccess &&         
                <motion.span
                    initial = { { y: -150} }
                    animate ={ { y: 0} }
                    exit={ { y: -150} }
                    transition = {{type: "spring", stiffness: 250, damping: 20 }}
                    className='z-10 fixed top-[10px] mx-auto shadow-lg flex justify-center'>
                        <Alert
                            message="Item(s) added to cart"
                            description={`${query.item} (${query.qty}) ${query.qty>1?'are':'is'} successfully added to your cart`}
                            type="success"
                            showIcon
                            closable
                        />
                </motion.span>
            }
        </AnimatePresence>
        <Page>
            <Page.SingleWindow size="sm" className=""
                title={`On The Menu`}
                des={`Discover our menu for ${month}. Join our plans to recieve exclusive offers and discount!`}
                center
                titleColor="text-green-700"
                component={
                    <div className="flex flex-col items-center py-10">
                        <Image src="/img/others/selectItems.svg" alt="selectItems" width={300} height={250} />
                        <Select className="mx-auto" defaultValue="all" style={{ width: 120 }} onChange={value=>setCategory(value)}>
                            <Select.Option value="all">All</Select.Option>
                            <Select.Option value="protein">Protein</Select.Option>
                            <Select.Option value="veggie">Veggie</Select.Option>
                            <Select.Option value="diet">Diet</Select.Option>
                            <Select.Option value="snacks">Snacks</Select.Option>
                        </Select>
                    </div>
                }
            />
            <Page.SingleWindow
                component={
                    <AnimatePresence exitBeforeEnter>
                        <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:space-x-7 mx-auto">
                            {sortMenu(menu, category).map( (p, i) => { return (
                                <motion.div
                                    className="flex items-center justify-center"
                                    key={p._id + i} 
                                    initial={{ x:50, opacity:0}}
                                    animate={{ x:0, opacity:1}}
                                    exit={{ x:-50, opacity:0}}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                >
                                    <Product data={p}  />
                                </motion.div>
                            )})}
                        </motion.div>
                    </AnimatePresence>
                }
            />
            <Page.SingleWindow size="md" className="mt-16 md:h-[450px] h-[600px] bg-cover bg-no-repeat bg-top md:bg-[url('/img/web/cook.jpeg')] bg-[url('/img/web/cook_sm.jpeg')]"
                component={
                    <Banner title="Get cooking" className="w-full h-full" right
                            des="Choose from 10 recipes a week and more options for quick, easy and healthy bites from curated suppliers to keep you fed all day long" 
                            to="/recipe" value="View"
                    />
                }
            />
        </Page>
        <Footer/>
    </div>
    )
}

export async function getStaticProps() {

    const res = await fetch('http://localhost:3000/api/menu')
    const menu = await res.json()

    return {
        props: {
            menu,
        }
    }
}

export default index