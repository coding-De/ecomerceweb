import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
  ProductArr:[]
}


const cartSlice = createSlice({
  name:"cartSlice",
  initialState,
  reducers:{
    addToCart : (state,action)=>{
           state.ProductArr = [...state.ProductArr,action.payload]
    },
    removeCartItem : (state,action)=>{
      state.ProductArr = [];
}
  }
})
 const store = configureStore({
  reducer:{
    allCart:cartSlice.reducer
  },
})

export const {addToCart} =  cartSlice.actions;
export const {removeCartItem} =  cartSlice.actions;
export default store;