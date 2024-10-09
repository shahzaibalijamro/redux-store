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
            increaseQuantity : (state,action) => {
                state.myCart.map((item,index) => {
                    if (item.id === action.payload.id) {
                        item.quantity = item.quantity+1
                    }
                })
            },
            removeCartItem: (state, action) => {
                state.myCart.splice(action.payload.index, 1)
            },
        }
    }
)

export const { addCartItem, removeCartItem,increaseQuantity } = cartSlice.actions
export default cartSlice.reducer