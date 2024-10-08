import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../reducers/cartSlice'
import productReducer from '../reducers/productSlice'
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer,
    }
})