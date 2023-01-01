

import { createSlice } from "@reduxjs/toolkit";



const themeSlice=createSlice({
    name:'theme',
    initialState:{darkTheme:false,showToggle:false},
    reducers:{
        darkTheme(state,action){
            state.darkTheme=action.payload
        },
        showToggle(state){
            state.showToggle=true
        }
    }
})

export default themeSlice.reducer
export const themeActions=themeSlice.actions