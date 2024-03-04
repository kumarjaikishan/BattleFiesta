import { createSlice } from "@reduxjs/toolkit";

const islogin = createSlice({
    name:"login",
    initialState:{
        islogin:false,
        head:"LogIn",
        narrow:true,
        loader:false,
        user:{}
    },
    reducers:{
        setlogin(state, action){
           state.islogin = action.payload;
        },
        header(state, action){
           state.head = action.payload;
        },
        setnarrow(state, action){
           state.narrow = action.payload;
        },
        setloader(state, action){
           state.loader = action.payload;
        },
        setuser(state, action){
           state.user = action.payload;
        }
    }

})
export const {setuser,setlogin,header,setnarrow,setloader}= islogin.actions;
export default islogin.reducer;