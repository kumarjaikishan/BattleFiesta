import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const tdmfetch = createAsyncThunk("tdmfetch", async () => {
    const token = localStorage.getItem("token");
    // console.log("called all tournment");
    // console.time("time taken by userdata");
    try {
        const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}gettdm`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        const data = await res.json();
        //  console.timeEnd("time taken by userdata");
        // console.log("from redux api", data);
        return data;
    } catch (error) {
        console.log(error);
    }
})


const tdm = createSlice({
    name: "tdm",
    initialState: {
        tdmdetail: {},
        tdmsetting: {},
        tdmteams: {},
        loading: false,
        error: null,
    },
    reducers: {
        settdmall(state, action) {
            state.tdmdetail = action.payload.tournament;
            state.tdmsetting = action.payload.settings;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(tdmfetch.pending, (state,action) => {
            state.loading = true;
        })
        builder.addCase(tdmfetch.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error
        })
        builder.addCase(tdmfetch.fulfilled, (state, action) => {
            state.loading = false;
        })
    }
})
export const { settdmall } = tdm.actions;
export default tdm.reducer;