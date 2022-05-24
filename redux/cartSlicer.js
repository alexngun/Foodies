import { createSlice, current } from "@reduxjs/toolkit"

export const cartSlicer = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            state = action.payload
            return state
        },
        modifyCart: (state, action) => {
            for( let product of state ) 
                if(product._id === action.payload.id) {
                    product.qty = action.payload.qty
                    break
                }
            return state
        },
        deleteItem: (state, action) => {
            state = state.filter( product=> product._id !== action.payload.id)
            return state
        }
    }
})

export const { setCart, modifyCart, deleteItem } = cartSlicer.actions

export default cartSlicer.reducer