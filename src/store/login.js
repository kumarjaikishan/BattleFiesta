import { createSlice } from "@reduxjs/toolkit";

const islogin = createSlice({
    name:"login",
    initialState:{
        islogin:false,
        head:"LogIn",
        loader:false,
        isadmin:false,
    },
    reducers:{
        setlogin(state, action){
           state.islogin = action.payload;
        },
        header(state, action){
           state.head = action.payload;
        },
        setloader(state, action){
           state.loader = action.payload;
        },
        setadmin(state, action){
           state.isadmin = action.payload;
        }
    }

})
export const {setadmin,setlogin,header,setloader}= islogin.actions;
export default islogin.reducer;