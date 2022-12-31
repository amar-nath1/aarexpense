
import { createSlice } from "@reduxjs/toolkit";

// const userObj= JSON.parse(localStorage.getItem('currUser'))
// const userToken=userObj.token

const authSlice=createSlice({

    name:'authentication',
    initialState:{authenticated:false,token:null,emailId:null},
    reducers:{

        login(state){
            state.authenticated=true
        },
        logout(state){
            state.authenticated=false
        },
        userToken(state,action){
            state.token=action.payload
        },
        userEmail(state,action){
            state.emailId=action.payload
        }

    }

})
export default authSlice.reducer
export const authActions=authSlice.actions