import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const alltourna = createAsyncThunk("alltourna", async () => {
    const token = localStorage.getItem("token");
    // console.log("called all tournment");
    // console.time("time taken by userdata");
    try {
        const res = await fetch(`${import.meta.env.VITE_API_ADDRESS}gettournament`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        const data = await res.json();
        //  console.timeEnd("time taken by userdata");
        // console.log("from api page redux api", data);
        return data;
    } catch (error) {
        console.log(error);
    }
})


const tournacenter = createSlice({
    name: "user",
    initialState: {
        alltournaments: [],
        current_tourna_details: [],
        user: {},
        links: "",
        loading: false,
        error: null,
        profilepic: "",
        createnewmodal: false,
        linkaddress:'https://battlefiesta.vercel.app',
    },
    reducers: {
        userlogout(state, action) {
            localStorage.clear();
            state.explist = [];
            state.ledgerlist = [];
            state.user = {};
        },
        profilepicupdtae(state, action) {
            state.profilepic = action.payload;
        },
        profiledetailupdtae(state, action) {
            state.user.name = action.payload.name;
            state.user.phone = action.payload.phone;
        },
        settournaid(state, action) {
            state.current_tourna_details = action.payload;
            state.links = action.payload._id;
        },
        setcreatenewmodal(state, action) {
            state.createnewmodal = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(alltourna.pending, (state,action) => {
            state.loading = true;
        })
        builder.addCase(alltourna.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error
        })
        builder.addCase(alltourna.fulfilled, (state, action) => {
            state.loading = false;
            state.alltournaments = action.payload.data;
            state.links = "";
            state.current_tourna_details = [];
        })
    }
})
export const { setcreatenewmodal,userlogout, profilepicupdtae, profiledetailupdtae, settournaid } = tournacenter.actions;
export default tournacenter.reducer;