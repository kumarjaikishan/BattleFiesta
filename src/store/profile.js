import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const profilefetch = createAsyncThunk("profilefetch", async () => {
    const token = localStorage.getItem("token");
    try {
        // const res = await fetch(`https://esport-backend.vercel.app/profile`, {
        const res = await fetch(`http://localhost:5000/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        let alldata = await res.json();
        // console.log("profileapi", alldata);
        return alldata;
    } catch (error) {
        console.log(error);
    }
})


const profile = createSlice({
    name: "userprofile",
    initialState: {
        userprofile: {},
        membership: {},
        loading: false,
        error: null,
    },
    reducers: {
        profilepicupdtae(state, action) {

        },
    },
    extraReducers: (builder) => {
        builder.addCase(profilefetch.pending, (state,) => {
            state.loading = true;
        })
        builder.addCase(profilefetch.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error
        })
        builder.addCase(profilefetch.fulfilled, (state, action) => {
            state.loading = false;
            state.userprofile = action.payload.data;
            state.membership = action.payload.member;
        })
    }
})
export const { profilepicupdtae } = profile.actions;
export default profile.reducer;