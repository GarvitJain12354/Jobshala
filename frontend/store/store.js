import { configureStore } from "@reduxjs/toolkit"; 
import  counterReducer  from "./Reducers/controlreducers";
export const store = configureStore({
    reducer:{
        counterReducer
    }
})