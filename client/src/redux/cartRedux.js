import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "cart",
    initialState: {
      products: [],
      quantity: 0,
      total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
          state.quantity += 1;
          state.products.push(action.payload);
          state.total += action.payload.price * action.payload.quantity;
        },
        addQuantitty: (state,action) => {
           const product = state.products.find((item=>item._id === action.payload._id))
           product.quantity+=1
           state.total += action.payload.price 
        },
        removeQuantitty: (state,action) => {
          const product = state.products.find((item=>item._id === action.payload._id))
          if(product.quantity > 1) {
            product.quantity-=1
            state.total -= action.payload.price 
          }
       },
       removeProduct:(state,action) => {
        const index = state.products.findIndex((item=>item._id === action.payload._id))
        state.total-= state.products[index].price;
        state.quantity-= 1;
        state.products.splice(index, 1);

       },
        clear: (state,action ) => {
          state.products = []
          state.quantity = 0
          state.total = 0
        },
      },
    });
    
    export const { addProduct, addQuantitty, removeQuantitty, clear, removeProduct } = cartSlice.actions;
    export default cartSlice.reducer;