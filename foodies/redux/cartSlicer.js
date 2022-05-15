import { createSlice } from "@reduxjs/toolkit"
import { shoppingItems } from '../mock/cart'

export const cartSlicer = createSlice({
    name: "cart",
    initialState: shoppingItems,
    reducers: {
        addToCart: (state, action) => {
            return [...state, action.payload]
        }
    }
})

export const { addToCart } = cartSlicer.actions

export default cartSlicer.reducer