import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const contentFetch = createAsyncThunk('contentFetcher', async (_, thunkAPI) => {

    let response = await axios.get("/content/getcontent")
    let data = response.data
    let payload = data.payload
    if (data.message === "success") {
        return payload;
    }
    else {
        return thunkAPI.rejectWithValue(data)
    }
})


export const deletefromContent = createAsyncThunk('deletefromContent', async (content, thunkAPI) => {
    let { index } = content
    let response = await axios.put("/content/deletefromcontent", content)
    let data = response.data
    if (data.message === "success") {
        return { index: index };
    }
    else {
        return thunkAPI.rejectWithValue(data)
    }
})

export const editfromContent = createAsyncThunk('editfromContent', async (contentObj, thunkAPI) => {
    let { index, content } = contentObj
    let response = await axios.put("/content/editfromcontent", content)
    let data = response.data
    if (data.message === "success") {
        return { index: index, content: content };
    }
    else {
        return thunkAPI.rejectWithValue(data)
    }
})



const contentSlice = createSlice({
    name: "content",
    initialState: {
        contentObj: [],
        isSuccess: false,
        isLoading: false,
        isError: false,
        invalidLoginMessage: ""
    },
    reducers: {

    },
    extraReducers: {
        [contentFetch.fulfilled]: (state, action) => {
            state.contentObj = action.payload;
            state.isSuccess = true;
            state.isLoading = false;
            state.invalidLoginMessage = "";
            state.isError = false;

        },
        [contentFetch.pending]: (state, action) => {
            state.isLoading = true;
        },
        [contentFetch.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.invalidLoginMessage = action.payload.message;
        },

        [deletefromContent.fulfilled]: (state, action) => {
            state.contentObj.splice(action.payload.index, 1);
            state.isSuccess = true;
            state.isLoading = false;
            state.invalidLoginMessage = "";
            state.isError = false;

        },
        [deletefromContent.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deletefromContent.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.invalidLoginMessage = action.payload.message;
        },

        [editfromContent.fulfilled]: (state, action) => {
            state.contentObj[action.payload.index] = action.payload.content;
            state.isSuccess = true;
            state.isLoading = false;
            state.invalidLoginMessage = "";
            state.isError = false;

        },
        [editfromContent.pending]: (state, action) => {
            state.isLoading = true;
        },
        [editfromContent.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.invalidLoginMessage = action.payload.message;
        }


    }
})

export default contentSlice.reducer