import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppService } from "../../service";
const { serviceFetch } = new AppService()

export const tokenThunk = createAsyncThunk(
    'token/tokenThunk',
    async() => {
        const { token } = await serviceFetch('token')
        return token
    }
)

const tokenSlice = createSlice({
    name: 'token',
    initialState:{
        token:"",
        loading: true,
        error: null
    },
    extraReducers:(builds) => {
        builds
        .addCase(tokenThunk.pending,(state) => {
            state.error = null;
            state.loading = true;
        })
        .addCase(tokenThunk.fulfilled,(state,action) => {
            state.token = action.payload;
            state.loading = false;
        })
        .addCase(tokenThunk.rejected,(state) => {
            state.loading = false;
            state.error = 'some error'
        })
    }
})

export default tokenSlice.reducer;