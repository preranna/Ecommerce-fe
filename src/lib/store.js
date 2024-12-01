import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './feature/counter-slice'
import productReducer from './feature/product-slice'


export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      Products : productReducer
    },
  })
}