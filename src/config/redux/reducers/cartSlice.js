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
            decreaseQuantity : (state,action) => {
                state.myCart.map((item,index) => {
                    if (item.id === action.payload.id) {
                        item.quantity = item.quantity-1
                    }
                })
            },
            removeCartItem: (state, action) => {
                for (let i = 0; i < state.myCart.length; i++) {
                    if (state.myCart[i].id === action.payload.id) {
                        state.myCart.splice(i, 1)
                    }
                }
            },
        }
    }
)

export const { addCartItem, removeCartItem,increaseQuantity,decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer