import { useDispatch, useSelector } from 'react-redux';
import { toggleSideMenu } from '../../redux/sideMenuSlicer'

const openStyle_1 = "rotate-45 translate-y-2"
const openStyle_2 = "opacity-0"
const openStyle_3 = "-rotate-45 -translate-y-2"

const closeStyle_1 = "rotate-0 translate-y-0"
const closeStyle_2 = "opacity-1"
const closeStyle_3 = "rotate-0 translate-y-0"

function BurgerMenuIcon({className}) {

    const toggle = useSelector(state=>state.sideMenu)
    const dispatch = useDispatch()

  return (
    <div className={`w-7 h-7 flex flex-col justify-evenly hover:cursor-pointer ${className}`} onClick={()=>dispatch(toggleSideMenu())}>
        <i className={`w-4/5 h-1 bg-green-700 rounded transition-all ${toggle?openStyle_1:closeStyle_1}`}/>
        <i className={`w-4/5 h-1 bg-green-700 rounded transition-all ${toggle?openStyle_2:closeStyle_2}`}/>
        <i className={`w-4/5 h-1 bg-green-700 rounded transition-all ${toggle?openStyle_3:closeStyle_3}`}/>
    </div>
  )
}

export default BurgerMenuIcon