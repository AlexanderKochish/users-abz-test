import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppService } from "../../service";
const { serviceFetch } = new AppService()

export const positionsThunk = createAsyncThunk(
    'position/positionsThunk',
    async() => {
        const {positions} = await serviceFetch('positions')
        return positions
    }
)

const positionsSlice = createSlice({
    name: 'positions',
    initialState:{
        positions:[],
        loading: true,
        error: null
    },
    extraReducers:(builds) => {
        builds
        .addCase(positionsThunk.pending,(state) => {
            state.error = null;
            state.loading = true;
        })
        .addCase(positionsThunk.fulfilled,(state, action) => {
            state.positions = action.payload;
            state.loading = false;
        })
        .addCase(positionsThunk.rejected,(state) => {
            state.loading = false;
            state.error = 'some error'
        })
    }
})

export default positionsSlice.reducer;