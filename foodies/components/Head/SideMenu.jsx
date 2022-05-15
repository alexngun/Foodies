import Link from "../Link"
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useSelector } from "react-redux"

function SideMenu() {

    const sideMenu = useSelector(state=>state.sideMenu)

  return (
    <div  className={`fixed left-0 w-full h-full top-15 border-t-2 transition-all sm:hidden ${sideMenu ? 'translate-x-0' : '-translate-x-[100vw]' }  `}>
        <ul className="mx-auto max-w-fit space-y-12 mt-10 translate-x-2">
            <li className="flex items-center"> 
                <Link to="/about" className="text-xl justify-center">About</Link> 
                <MdKeyboardArrowRight className="text-xl text-green-700"/>
            </li>
            <li className="flex items-center"> 
                <Link to="/menu" className="text-xl justify-center">Menu</Link>
                <MdKeyboardArrowRight className="text-xl text-green-700"/>
            </li>
            <li className="flex items-center"> 
                <Link to="/plans" className="text-xl justify-center">Plans</Link> 
                <MdKeyboardArrowRight className="text-xl text-green-700"/>
            </li>
            <li className="flex items-center"> 
                <Link to="/recipe" className="text-xl justify-center">Recipe</Link> 
                <MdKeyboardArrowRight className="text-xl text-green-700"/>
            </li>
            <li className="flex items-center"> 
                <Link to="/help" className="text-xl justify-center">Help</Link> 
                <MdKeyboardArrowRight className="text-xl text-green-700"/>
            </li>
        </ul>
    </div>
  )
}

export default SideMenu