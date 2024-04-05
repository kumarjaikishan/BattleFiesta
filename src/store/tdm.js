import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const tdmfetch = createAsyncThunk("tdmfetch", async (tid) => {
    const token = localStorage.getItem("token");
    try {
        const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}gettdm`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ tid })
          });
        const data = await responsee.json();
        console.log('tdm fetch', data);
        return data;
    } catch (error) {
        console.log(error);
    }
})


const tdm = createSlice({
    name: "tdm",
    initialState: {
        tdmdetail: '',
        tdmsetting: '',
        tdmplayers: '',
        loading: false,
        error: null,
    },
    reducers: {
        settdmall(state, action) {
            state.tdmdetail = action.payload.tournament;
            state.tdmsetting = action.payload.settings;
            state.tdmplayers = action.payload.players;
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
            state.tdmdetail = action.payload.tournament;
            state.tdmsetting = action.payload.settings;
            state.tdmplayers = action.payload.players;
        })
    }
})
export const { settdmall } = tdm.actions;
export default tdm.reducer;