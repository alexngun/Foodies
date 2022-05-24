import { configureStore } from "@reduxjs/toolkit"
import sideMenuReducer from "./sideMenuSlicer"
import cartReducer from "./cartSlicer"

export const store = configureStore({
    reducer: {
        sideMenu: sideMenuReducer,
        cart: cartReducer,
    }
})