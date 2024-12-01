import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value : [],
    error : false,
    isloading : false,
}

export const productReducer = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    setProducts : (state, action ) => {
        console.log(action);
        state.value = action.payload;
        state.isloading = false;
        state.error = false;
    },
    seterror : (state, action ) => {
        state.value = initialState.value;
        state.isloading = false;
        state.error = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProducts, seterror  } = productReducer.actions

export default productReducer.reducer