
import { createSlice } from "@reduxjs/toolkit";

const expenseSlice=createSlice({
    name:'expenses',
    initialState:{expenseArr:[],premElg:false},
    reducers:{
        updateExpArr(state,action){
            state.expenseArr=action.payload
        },
        eligibleForPrem(state,action){
            state.premElg=action.payload
        }
    }
})

export default expenseSlice.reducer

export const expenseActions=expenseSlice.actions