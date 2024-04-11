import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const classicfetch = createAsyncThunk("classicfetch", async (tid) => {
    const token = localStorage.getItem("token");
    try {
        const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}getclassic`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ tid })
          });
        const data = await responsee.json();
        console.log('classic fetch', data);
        return data;
    } catch (error) {
        console.log(error);
    }
})


const classic = createSlice({
    name: "classic",
    initialState: {
        classicdetail: '',
        classicsetting: '',
        classicplayers: '',
        loading: false,
        error: null,
        message:''
    },
    reducers: {
        settdmall(state, action) {
            state.classicsetting = action.payload.tournament;
            state.tdmsetting = action.payload.settings;
            state.classicplayers = action.payload.players;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(classicfetch.pending, (state,action) => {
            state.loading = true;
        })
        builder.addCase(classicfetch.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error
        })
        builder.addCase(classicfetch.fulfilled, (state, action) => {
            state.loading = false;
            state.classicdetail = action.payload.tournament;
            state.classicsetting = action.payload.settings;
            state.classicplayers = action.payload.players;
            state.message = action.payload.message;
        })
    }
})
export const { settdmall } = classic.actions;
export default classic.reducer;