import Link from "../Link"
import { MdKeyboardArrowRight } from 'react-icons/md'

import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";
import { closeSideMenu } from "../../redux/sideMenuSlicer";

const calculateScrollOffset = () => {
    var scroll;
    scroll = window.pageYOffset || document.documentElement.scrollTop
    return scroll < 28 ? 84 - scroll : 56
}

function SideMenu() {

    const sideMenu = useSelector(state=>state.sideMenu)
    const [mount, setMount] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        if ( typeof window != "undefined") {
            setMount(calculateScrollOffset())
        }
    })

    if (typeof window != "undefined" ) {
        sideMenu ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'scroll'
    }

    return (

        mount ?     
            <div 
                className={`fixed bg-white z-10 left-0 w-full h-screen top-[56px] border-t-2 transition-transform sm:hidden ${sideMenu ? 'translate-x-0' : '-translate-x-[100vw]' }  `}
                style = { {top: `${mount}px` } }
            >
                <ul className="mx-auto max-w-fit space-y-12 mt-10 translate-x-2">
                    <li className="flex items-center"> 
                        <Link onClick={()=>dispatch(closeSideMenu())} to="/about" className="text-xl justify-center">About</Link> 
                        <MdKeyboardArrowRight className="text-xl text-green-700"/>
                    </li>
                    <li className="flex items-center"> 
                        <Link onClick={()=>dispatch(closeSideMenu())}  to="/menu" className="text-xl justify-center">Menu</Link>
                        <MdKeyboardArrowRight className="text-xl text-green-700"/>
                    </li>
                    <li onClick={()=>dispatch(closeSideMenu())} className="flex items-center"> 
                        <Link onClick={()=>dispatch(closeSideMenu())} to="/plans" className="text-xl justify-center">Plans</Link> 
                        <MdKeyboardArrowRight className="text-xl text-green-700"/>
                    </li>
                    <li onClick={()=>dispatch(closeSideMenu())} className="flex items-center"> 
                        <Link onClick={()=>dispatch(closeSideMenu())} to="/recipe" className="text-xl justify-center">Recipe</Link> 
                        <MdKeyboardArrowRight className="text-xl text-green-700"/>
                    </li>
                    <li onClick={()=>dispatch(closeSideMenu())} className="flex items-center"> 
                        <Link onClick={()=>dispatch(closeSideMenu())} to="/help" className="text-xl justify-center">Help</Link> 
                        <MdKeyboardArrowRight className="text-xl text-green-700"/>
                    </li>
                </ul>
            </div> :
            <></>
  
    )
}

export default SideMenu