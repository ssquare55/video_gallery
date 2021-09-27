import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk('loginUser', async (userCredentialsObj, thunkAPI) => {
    let data;
    let response;
    if (userCredentialsObj.userType === "user") {
        response = await axios.post('/users/login', userCredentialsObj)
        data = response.data
    }

    if (userCredentialsObj.userType === "admin") {
        response = await axios.post('/admin/login', userCredentialsObj)
        data = response.data
    }

    if (data.message === "success") {

        //save in local storage
        localStorage.setItem("token", data.token)
        return data.user
    }
    if (data.message === "Invalid username" || data.message === "Invalid password") {
        //it will provide data to rejected state
        return thunkAPI.rejectWithValue(data)
    }

})


export const editfromUser = createAsyncThunk('editfromUser', async (userObj, thunkAPI) => {

    let response = await axios.put("/users/editfromuser", userObj)
    let data = response.data
    if (data.message === "success") {
        return userObj;
    }
    else {
        return thunkAPI.rejectWithValue(data)
    }
})




const userSlice = createSlice({
    name: "user",
    initialState: {
        userObj: {},
        isSuccess: false,
        isLoading: false,
        isError: false,
        invalidLoginMessage: ""
    },
    reducers: {
        clearLoginStatus: (state) => {
            state.userObj = {},
                state.isSuccess = false
            return state
        }
    },
    extraReducers: {
        [userLogin.fulfilled]: (state, action) => {
            state.userObj = action.payload;
            state.isSuccess = true;
            state.isLoading = false;
            state.invalidLoginMessage = "";
            state.isError = false;

        },
        [userLogin.pending]: (state, action) => {
            state.isLoading = true;
        },
        [userLogin.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.invalidLoginMessage = action.payload.message;
        },

        [editfromUser.fulfilled]: (state, action) => {
            state.userObj = action.payload;
            state.isSuccess = true;
            state.isLoading = false;
            state.invalidLoginMessage = "";
            state.isError = false;

        },
        [editfromUser.pending]: (state, action) => {
            state.isLoading = true;
        },
        [editfromUser.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.invalidLoginMessage = action.payload.message;
        },



    }
})

export const { clearLoginStatus } = userSlice.actions
export default userSlice.reducer