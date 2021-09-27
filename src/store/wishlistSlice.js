import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const wishlistFetch = createAsyncThunk('wishlistFetch', async (email, thunkAPI) => {
    let response = await axios.get(`/wishlist/getwishlist/${email.email}`)
    let data = response.data
    let payload = data.payload
    if (data.message === "success") {
        return payload;
    }
    else {
        return thunkAPI.rejectWithValue(data)
    }
})

export const addtoWishlist = createAsyncThunk('addtoWishlist', async (content, thunkAPI) => {
    let response = await axios.post("/wishlist/addtowishlist", content)
    let data = response.data
    let payload = data.payload
    if (data.message === "success") {
        return payload;
    }
    else {
        return thunkAPI.rejectWithValue(data)
    }
})

export const deletefromWishlist = createAsyncThunk('deletefromWishlist', async (content, thunkAPI) => {
    let { index } = content
    let response = await axios.put("/wishlist/deletefromwishlist", content)
    let data = response.data
    let payload = data.payload
    if (data.message === "success") {
        return index;
    }
    else {
        return thunkAPI.rejectWithValue(data)
    }
})



const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlistObj: [],
        isSuccess: false,
        isLoading: false,
        isError: false,
        invalidLoginMessage: ""
    },
    reducers: {
    },
    extraReducers: {
        [wishlistFetch.fulfilled]: (state, action) => {
            state.wishlistObj = action.payload;
            state.isSuccess = true;
            state.isLoading = false;
            state.invalidLoginMessage = "";
            state.isError = false;

        },
        [wishlistFetch.pending]: (state, action) => {
            state.isLoading = true;
        },
        [wishlistFetch.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.invalidLoginMessage = action.payload.message;
        },


        [addtoWishlist.fulfilled]: (state, action) => {
            state.wishlistObj.push(action.payload);
            state.isSuccess = true;
            state.isLoading = false;
            state.invalidLoginMessage = "";
            state.isError = false;

        },
        [addtoWishlist.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addtoWishlist.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.invalidLoginMessage = action.payload.message;
        },

        [deletefromWishlist.fulfilled]: (state, action) => {
            state.wishlistObj.splice(action.payload, 1);
            state.isSuccess = true;
            state.isLoading = false;
            state.invalidLoginMessage = "";
            state.isError = false;

        },
        [deletefromWishlist.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deletefromWishlist.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.invalidLoginMessage = action.payload.message;
        }







    }
})


export default wishlistSlice.reducer