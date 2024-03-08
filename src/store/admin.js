import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First API call
export const memshipentry = createAsyncThunk("memshipentry", async () => {
    const token = localStorage.getItem("token");
    try {
        const responsee = await fetch(`https://esport-backend.vercel.app/memshipentry`, {
        // const responsee = await fetch(`http://localhost:5000/memshipentry`, {
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
    try {
        const responsee = await fetch(`https://esport-backend.vercel.app/contactformlist`, {
        // const res = await fetch(`http://localhost:5000/contactformlist`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        const contactusform = await res.json();
        return contactusform;
    } catch (error) {
        console.log(error);
        throw Error("Failed to fetch membership data");
    }
});

// third API call
export const voucher = createAsyncThunk("voucher", async () => {
    const token = localStorage.getItem("token");
    try {
        const responsee = await fetch(`https://esport-backend.vercel.app/getvoucher`, {
        // const res = await fetch(`http://localhost:5000/getvoucher`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        const voucher = await res.json();
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
    try {
        const responsee = await fetch(`https://esport-backend.vercel.app/getmembership`, {
        // const res = await fetch(`http://localhost:5000/getmembership`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        const membership = await res.json();
        // console.log(voucher);
        return membership;
    } catch (error) {
        console.log(error);
        throw Error("Failed to fetch membership data");
    }
});

// fourth API call
export const Users = createAsyncThunk("Users", async () => {
    const token = localStorage.getItem("token");
    try {
        const responsee = await fetch(`https://esport-backend.vercel.app/getusers`, {
        // const res = await fetch(`http://localhost:5000/getusers`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        const membership = await res.json();
        // console.log(voucher);
        return membership;
    } catch (error) {
        console.log(error);
        throw Error("Failed to fetch membership data");
    }
});


const admin = createSlice({
    name: "userprofile",
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
        builder
            .addCase(memshipentry.pending, (state,) => {
                state.loading = true;
            })
            .addCase(memshipentry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(memshipentry.fulfilled, (state, action) => {
                state.loading = false;
                state.membershipentry = action.payload.data;
            })
            .addCase(contactusform.pending, (state,) => {
                state.loading = true;
            })
            .addCase(contactusform.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(contactusform.fulfilled, (state, action) => {
                state.loading = false;
                state.contactusform = action.payload.data;
            })
            .addCase(voucher.pending, (state,) => {
                state.loading = true;
            })
            .addCase(voucher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(voucher.fulfilled, (state, action) => {
                state.loading = false;
                state.voucher = action.payload.data;
            })
            .addCase(membership.pending, (state,) => {
                state.loading = true;
            })
            .addCase(membership.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(membership.fulfilled, (state, action) => {
                state.loading = false;
                state.membership = action.payload.data;
            })
            .addCase(Users.pending, (state,) => {
                state.loading = true;
            })
            .addCase(Users.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(Users.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
            })
    }
});

export const { profilepicupdtae } = admin.actions;
export default admin.reducer;
