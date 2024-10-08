import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice(
    {
        name: 'cartItems',
        initialState: {
            myCart: []
        },
        reducers: {
            addCartItem: (state, action) => {
                state.myCart.push(action.payload.item)
            },
            removeCartItem: (state, action) => {
                state.myCart.splice(action.payload.index, 1)
            },
        }
    }
)

export const { addCartItem, removeCartItem } = cartSlice.actions
export default cartSlice.reducer