import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First API call
export const memshipentry = createAsyncThunk("memshipentry", async () => {
    const token = localStorage.getItem("token");
    console.log("membership entry called from admin");
    try {
        const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}memshipentry`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        const data = await responsee.json();
        // console.log('api membership entry', data);
        return data;
    } catch (error) {
        console.log(error);
        throw Error("Failed to fetch profile data");
    }
});

// Second API call
export const contactusform = createAsyncThunk("contactusform", async () => {
    const token = localStorage.getItem("token");
    // console.log("contact form");
    try {
        const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}contactformlist`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        const contactusform = await responsee.json();
        return contactusform;
    } catch (error) {
        console.log(error);
        throw Error("Failed to fetch membership data");
    }
});

// third API call
export const voucher = createAsyncThunk("voucher", async () => {
    const token = localStorage.getItem("token");
    // console.log("vouvhers");
    try {
        const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}getvoucher`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        const voucher = await responsee.json();
        // console.log(voucher);
        return voucher;
    } catch (error) {
        console.log(error);
        throw Error("Failed to fetch membership data");
    }
});

// fourth API call
export const membership = createAsyncThunk("membership", async () => {
    const token = localStorage.getItem("token");
    // console.log("membership entry");
    try {
        const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}getmembership`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        const membership = await responsee.json();
        // console.log(voucher);
        return membership;
    } catch (error) {
        console.log(error);
        throw Error("Failed to fetch membership data");
    }
});

// Fifth API call
export const Users = createAsyncThunk("Users", async () => {
    const token = localStorage.getItem("token");
    // console.log("all users entry");
    try {
        const responsee = await fetch(`${import.meta.env.VITE_API_ADDRESS}getusers`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        const membership = await responsee.json();
        // console.log(voucher);
        return membership;
    } catch (error) {
        console.log(error);
        throw Error("Failed to fetch membership data");
    }
});


const admin = createSlice({
    name: "admin",
    initialState: {
        membershipentry: [],
        contactusform: [],
        voucher: [],
        membership: [],
        users: [],
        loading: false,
        error: null,
    },
    reducers: {
        profilepicupdtae(state, action) {
            // Reducer logic for profile pic update
        },
    },
    extraReducers: (builder) => {
        builder.addCase(memshipentry.pending, (state,action) => {
            state.loading = true;
        })
        builder.addCase(memshipentry.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(memshipentry.fulfilled, (state, action) => {
            state.loading = false;
            state.membershipentry = action.payload.data;
        })
        builder.addCase(contactusform.pending, (state,action) => {
            state.loading = true;
        })
        builder.addCase(contactusform.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(contactusform.fulfilled, (state, action) => {
            state.loading = false;
            state.contactusform = action.payload.data;
        })
        builder.addCase(voucher.pending, (state,action) => {
            state.loading = true;
        })
        builder.addCase(voucher.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(voucher.fulfilled, (state, action) => {
            state.loading = false;
            state.voucher = action.payload.data;
        })
        builder.addCase(membership.pending, (state,action) => {
            state.loading = true;
        })
        builder.addCase(membership.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(membership.fulfilled, (state, action) => {
            state.loading = false;
            state.membership = action.payload.data;
        })
        builder.addCase(Users.pending, (state,action) => {
            state.loading = true;
        })
        builder.addCase(Users.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(Users.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.data;
        })
    }
});

export const { profilepicupdtae } = admin.actions;
export default admin.reducer;
