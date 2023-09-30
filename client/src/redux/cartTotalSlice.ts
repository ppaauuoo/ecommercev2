import { createSlice } from "@reduxjs/toolkit";

export interface cartTotalState {
    value: number
  }

const initialState:cartTotalState = {value : 0}

export const cartTotalSlice = createSlice({
    name: 'cartTotal',
    initialState,
    reducers:{
        increment(state){
            state.value+=1;
        },
        clear(state){
            state.value=0;
        },
    }
})

// Action creators are generated for each case reducer function
export const { increment, clear } = cartTotalSlice.actions