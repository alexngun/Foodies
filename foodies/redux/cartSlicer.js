import { createSlice } from "@reduxjs/toolkit"
import { shoppingItems } from '../mock/cart'

export const cartSlicer = createSlice({
    name: "cart",
    initialState: shoppingItems,
    reducers: {
        addToCart: (state, action) => {
            var isAppend = true;
            for( let product of state ) 
                if(product.id === action.payload.id) {
                    product.qty += action.payload.qty
                    isAppend = false;
                    break
                }
            isAppend && [...state, action.payload]
            return state
        }
    }
})

export const { addToCart } = cartSlicer.actions

export default cartSlicer.reducer