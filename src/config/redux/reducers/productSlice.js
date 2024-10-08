import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice(
    {
        name: 'products',
        initialState: {
            products: []
        },
        reducers: {
            addProducts: (state, action) => {
                state.products = [...action.payload.returnedProducts];
            },
        }
    }
)

export const {addProducts} = productSlice.actions
export default productSlice.reducer